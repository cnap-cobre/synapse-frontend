import {DropboxToAgaveFormat, fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

const list = (csrftoken, filePath) => {
  const url = '/dropbox/api/2/files/list_folder';
  let form = {
    'path': filePath.slice(1)
  };

  return fetch(url, {
    body: JSON.stringify(form),
    cache: 'no-cache',
    credentials: "same-origin",
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken
    },
    method: 'POST',
    mode: 'cors',
  })
  // Throw a proper error if we get a 500, etc. response code
      .then(fetchErrorThrower)

      // Convert to JSON
      .then(fetchToJson)

      // map Dropbox to Agave response format
      .then(DropboxToAgaveFormat)
};

const rm = (file) => () => {
  const url = '/dropbox/api/2/files/delete_v2';
  console.log('rm:   ' + file.path);
  let form = {
    'path': file.path
  };

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
  }).then(mutationCallback)

};

export default {
  list: list,
  share: () => {console.log('Share')},
  wget: () => () => {console.log('wget')},
  rename: () => {console.log('rename')},
  mv: () => {console.log('mv')},
  cp: () => {console.log('cp')},
  rm: rm()
};