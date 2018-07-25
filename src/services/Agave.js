import fileDownload from 'js-file-download';
import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

const listFiles = (filePath) => {
  const url = '/agave/files/v2/listings/system' + filePath + '?limit=1000';

  return fetch(url, {
    credentials: "same-origin",
  })
  // Throw a proper error if we get a 500, etc. response code
      .then(fetchErrorThrower)

      // Convert to JSON
      .then(fetchToJson)

      // extract result list
      .then((response) => response.result)
};

const listFileSystems = () => {
  return fetch(`/agave/systems/v2/`, {
    credentials: 'same-origin'
  })
  // Throw a propper error
      .then(fetchErrorThrower)
      .then(fetchToJson)
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

const moveCopyRenameMkdir = (action) => (file, path) => {
  const url = '/agave/files/v2/media/system/' + file.system + '/' + file.path;

  const form = {
    action,
    path,
  };

  return fetch(url, {
    body: JSON.stringify(form),
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    method: 'POST',
    mode: 'cors'
  });
};

export default {
  listFiles,
  listFileSystems,
  wget,
  rm,
  share: () => {console.log('Share')},
  mv: (file, dest) => moveCopyRenameMkdir('move')(file, dest),
  cp: (file, dest) => moveCopyRenameMkdir('copy')(file, dest),
  rename: (file, newName) => moveCopyRenameMkdir('rename')(file, newName),
  mkdir: (system, path, dirName) => moveCopyRenameMkdir('mkdir')({system, path}, dirName)
};