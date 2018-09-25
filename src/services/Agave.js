import fileDownload from 'js-file-download';
import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

const listFiles = (filePath) => {
  const trimmedPath = filePath.slice('/agave'.length);
  const url = '/agave/files/v2/listings/system' + trimmedPath + '?limit=1000';

  return fetch(url, {
    credentials: "same-origin",
  })
  // Throw a proper error if we get a 500, etc. response code
      .then(fetchErrorThrower)

      // Convert to JSON
      .then(fetchToJson)

      // extract result list
      .then((response) => response.result)

      //
      .then((list) => (list.map((file) => {
        file.provider = 'agave';
        return file;
      })))
};

const listFileSystems = () => {
  return fetch(`/agave/systems/v2/`, {
    credentials: 'same-origin'
  })
  // Throw a propper error
      .then(fetchErrorThrower)
      .then(fetchToJson)
};

const addFileSystem = (csrftoken, config) => {
  return fetch(`/agave/systems/v2/`, {
    body: JSON.stringify(config).replace(/!!!/g, "\\n"),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'X-CSRFToken': csrftoken,
      'content-type': 'application/json'
    }
  }).then(fetchErrorThrower)
    .then(fetchToJson);
};

const wget = (csrftoken, file) => {
  const url = '/agave/files/v2/media/system/' + file.system + '/' + file.path;

  let x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = 'blob';
  x.onload = (e) => {
    fileDownload(x.response, file.name);
  };
  x.send();
};

const rm = (csrftoken, file) => {
  const url = '/agave/files/v2/media/system/' + file.system + '/' + file.path;

  return fetch(url, {
    credentials: "same-origin",
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    mode: 'cors'
  }).then((response) => {
    console.log(response);
    return response;
  });
};

const moveCopyRenameMkdir = (action) => (csrftoken, file, path) => {
  const url = '/agave/files/v2/media/system/' + file.system + '/' + file.path + '?naked=true';

  console.log(file, path);

  const form = {
    action,
    path,
    append: false
  };

  return fetch(url, {
    body: JSON.stringify(form),
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    method: 'PUT',
    mode: 'cors'
  });
};

const mv = moveCopyRenameMkdir('MOVE');
const cp = moveCopyRenameMkdir('COPY');
const rename = moveCopyRenameMkdir('RENAME');

export default {
  listFiles,
  listFileSystems,
  addFileSystem,
  wget,
  rm,
  share: () => {console.log('Share')},
  mv,
  cp,
  rename,
  mkdir: (system, path, dirName) => moveCopyRenameMkdir('MKDIR')({system, path}, dirName)
};