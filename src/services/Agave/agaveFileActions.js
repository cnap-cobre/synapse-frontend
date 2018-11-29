import fileDownload from 'js-file-download';
import { fetchErrorThrower, fetchToJson } from '../../util/FetchUtils';

const listFiles = (csrftoken, filePath) => {
  const trimmedPath = filePath.slice('/agave'.length);
  const url = `/agave/files/v2/listings/system${trimmedPath}?limit=1000`;

  return fetch(url, {
    credentials: 'same-origin',
  })
  // Throw a proper error if we get a 500, etc. response code
    .then(fetchErrorThrower)

  // Convert to JSON
    .then(fetchToJson)

  // extract result list
    .then(response => response.result)

  //
    .then(list => (list.map((file) => {
      file.provider = 'agave';
      return file;
    })));
};

const wget = (csrftoken, file) => {
  const url = `/agave/files/v2/media/system/${file.system}/${file.path}`;

  const x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = (e) => {
    fileDownload(x.response, file.name);
  };
  x.send();
};

const rm = (csrftoken, file) => {
  const url = `/agave/files/v2/media/system/${file.system}/${file.path}`;

  return fetch(url, {
    credentials: 'same-origin',
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    mode: 'cors',
  });
};

const moveCopyRenameMkdir = action => (csrftoken, file, path) => {
  const url = `/agave/files/v2/media/system/${file.system}/${file.path}?naked=true`;

  const form = {
    action,
    path,
    append: false,
  };

  return fetch(url, {
    body: JSON.stringify(form),
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    method: 'PUT',
    mode: 'cors',
  });
};

const uploadFile = (csrftoken, file, path) => {
  const system = path.split('/')[2];
  const trimmedPath = path.slice((`/agave/${system}`).length);
  const url = `/agave/files/v2/media/system/${system}${trimmedPath.slice(0, -1)}?naked=true`;

  const data = new FormData();
  data.append('file', file);
  data.append('fileToUpload', file);
  data.append('append', false);
  data.append('fileType', 'raw');

  const req = new XMLHttpRequest();
  req.open('POST', url, true);
  req.setRequestHeader('X-CSRFToken', csrftoken);
  req.setRequestHeader('Accept', 'application/json');
  req.send(data);
};

const mv = moveCopyRenameMkdir('MOVE');
const cp = moveCopyRenameMkdir('COPY');
const rename = moveCopyRenameMkdir('RENAME');

export default {
  listFiles,
  wget,
  rm,
  share: () => { console.log('Share'); },
  mv,
  cp,
  rename,
  mkdir: (csrftoken, path, dirName) => {
    const system = path.slice('/agave/'.length).split('/')[0];
    const pathWithoutPrefix = ['', ...path.split('/').slice(3)].join('/');
    return moveCopyRenameMkdir('MKDIR')(csrftoken, { system, path: pathWithoutPrefix }, dirName);
  },
  uploadFile,
};
