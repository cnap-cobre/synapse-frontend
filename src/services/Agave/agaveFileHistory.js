import {fetchErrorThrower, fetchToJson} from "../../util/FetchUtils";

const fileHistory = (csrftoken, path) => {
  const url = '/agave/files/v2/history/system/' + path.split('/').slice(2).join('/');

  return fetch(url, {
    credentials: "same-origin"
  }).then(fetchErrorThrower)
    .then(fetchToJson)
    .then(response => response.result);
};

export default {
  fileHistory
};