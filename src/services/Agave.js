import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";
import fileDownload from 'js-file-download';

function list(filePath, signal){
  const url = '/agave/files/v2/listings/system/' + filePath + '?limit=1000';

  return fetch(url, {
    credentials: "same-origin",
    signal: signal
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

export default {
  list: list,
  share: () => {console.log('Share')},
  wget: wget,
  rename: () => {console.log('rename')},
  mv: () => {console.log('mv')},
  cp: () => {console.log('cp')},
  rm: () => {console.log('rm')},
}