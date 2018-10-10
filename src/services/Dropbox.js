import fileDownload from 'js-file-download';
import path from 'path';
import {DropboxToAgaveFormat, fetchErrorThrower, fetchToJson} from "../util/FetchUtils";
import {Dropbox} from 'dropbox/src/dropbox';


const urlRemap = (url) => (
    url.replace('https://content.dropboxapi.com', '/dropbox/content')
        .replace('https://api.dropboxapi.com', '/dropbox/api')
        .replace('https://www.dropbox.com', '/dropbox')
);


const dbx = (csrftoken) => {
  const modifiedFetch = (url, init) => {
    return fetch(
        urlRemap(url),
        Object.assign({}, init, {
          headers: {
            ...init.headers,
            'X-CSRFToken': csrftoken
          }
        })
    );
  };
  return (
    new Dropbox({
      fetch: modifiedFetch
    })
  )
};

const dropboxRequest = (csrftoken, url, form) => {
  return fetch(url, {
    body: JSON.stringify(form),
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    method: 'POST',
    mode: 'cors'
  });
};

const listFiles = (csrftoken, filePath) => {
  const url = '/dropbox/api/2/files/list_folder';

  // Dropbox wants an empty string when requesting the root of your Dropbox
  // Otherwise, it wants a leading forward slash.
  // Below is an IIFE to reconcile this insanity.
  const form = {
    'path': (x => x === '/' ? '' : x)(filePath.slice('/dropbox/home'.length))
  };

  return dropboxRequest(csrftoken, url, form)
  // Throw a proper error if we get a 500, etc. response code
      .then(fetchErrorThrower)

      // Convert to JSON
      .then(fetchToJson)

      // map Dropbox to Agave response format
      .then(DropboxToAgaveFormat)

      .then((list) => (list.map((file) => {
        file.provider = 'dropbox';
        return file;
      })))
};

const wget = (csrftoken, file) => {
  const url = '/dropbox/content/2/files/download';
  const form = {
    path: file.path
  };

  let x = new XMLHttpRequest();
  x.open("POST", url, true);
  x.responseType = 'blob';
  x.setRequestHeader('X-CSRFToken', csrftoken);
  x.setRequestHeader('Dropbox-API-Arg', JSON.stringify(form));
  x.onload = (e) => {
    fileDownload(x.response, file.name);
  };
  x.send();
};

const rm = (csrftoken, file) => {
  const url = '/dropbox/api/2/files/delete_v2';

  const form = {
    'path': file.path
  };

  return dropboxRequest(csrftoken, url, form);
};

const mv = (csrftoken, file, toPath) => {
  const url = '/dropbox/api/2/files/move_v2';

  const form = {
    'from_path': file.path,
    'to_path': path.resolve(path.dirname(file.path), toPath),
  };

  return dropboxRequest(csrftoken, url, form);
};

const cp = (csrftoken, file, toPath) => {
  const url = '/dropbox/api/2/files/copy_v2';

  const form = {
    'from_path': file.path,
    'to_path': toPath
  };

  return dropboxRequest(csrftoken, url, form)
};

const mkdir = (csrftoken, path, name) => {
  return dbx(csrftoken).filesCreateFolderV2({
    path: path.slice('/dropbox/home'.length) + name
  });
};

const uploadFile = (csrftoken, file, path) => {
  const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;
  const db = dbx(csrftoken);
  const trimmedPath = path.slice('/dropbox/home'.length);

  if(file.size < UPLOAD_FILE_SIZE_LIMIT) {
    return db.filesUpload({
      path: trimmedPath + file.name,
      contents: file
    })
  } else { // The file is bigger than 150 Mb, so we use a session
    const maxBlob = 8 * 1000 * 1000;

    const workItems = [];
    let offset = 0;

    while (offset < file.size) {
      let chunkSize = Math.min(maxBlob, file.size - offset);
      workItems.push(file.slice(offset, offset + chunkSize));
      offset += chunkSize;
    }

    const task = workItems.reduce((acc, blob, idx, items) => {
      if (idx == 0) {
        return acc.then(() => db.filesUploadSessionStart({close: false, contents: blob}))
            .then(response => response.session_id)
      } else if (idx < items.length - 1) {
        return acc.then(sessionId => db.filesUploadSessionAppendV2({
          cursor: {
            session_id: sessionId,
            offset: idx * maxBlob
          },
          close: false,
          contents: blob
        })).then(() => sessionId)
      } else {
        return acc.then(sessionId => db.filesUploadSessionFinish({
          cursor: {
            session_id: sessionId,
            offset: file.size - blob.size
          },
          commit: {
            path: trimmedPath + file.name,
            mode: 'add',
            autorename: true,
            mute: false
          }
        }))
      }
    }, Promise.resolve());
  }
};

export default {
  listFiles,
  wget,
  rm,
  share: () => {console.log('Share')},
  mv,
  cp,
  rename: mv,
  mkdir,
  uploadFile
};