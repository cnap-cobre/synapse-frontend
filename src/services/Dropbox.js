import fileDownload from 'js-file-download';
import path from 'path';
import {DropboxToAgaveFormat, fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

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

const mkdir = (csrftoken, path) => {
  const url = '/dropbox/api/2/files/create_folder_v2';

  const form = {
    path,
  };

  return dropboxRequest(csrftoken, url, form);
};

export default {
  listFiles,
  wget,
  rm,
  share: () => {console.log('Share')},
  mv,
  cp,
  rename: mv,
  mkdir
};