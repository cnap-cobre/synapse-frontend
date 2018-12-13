import { fetchErrorThrower, fetchToJson } from '../../util/FetchUtils';
import {syFetch} from "../util";

const fileHistory = (csrftoken, path) => {
  const url = `/agave/files/v2/history/system/${path.split('/').slice(2).join('/')}`;

  return syFetch(url, {
    credentials: 'same-origin',
  }).then(fetchErrorThrower)
    .then(fetchToJson)
    .then(response => response.result);
};

export default {
  fileHistory,
};
