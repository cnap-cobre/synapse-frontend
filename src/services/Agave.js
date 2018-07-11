import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";
import fileDownload from 'js-file-download';

function list(filePath){
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
}

const wget = (file) => () => {
  const url = '/agave/files/v2/media/system/' + file.system + '/' + file.path;

  let x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = 'blob';
  x.onload = (e) => {
    fileDownload(x.response, file.name);
  };
  x.send();
};

const rm = (file) => () => {
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
  }).then(mutationCallback);
}

export default {
  list: list,
  share: () => {console.log('Share')},
  wget: wget,
  rename: () => {console.log('rename')},
  mv: () => {console.log('mv')},
  cp: () => {console.log('cp')},
  rm: rm,
};