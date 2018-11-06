import {fetchErrorThrower, fetchToJson} from "../../util/FetchUtils";

const listFileSystems = () => {
  return fetch(`/agave/systems/v2/`, {
    credentials: 'same-origin'
  })
  // Throw a proper error
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

export default {
  addFileSystem,
  listFileSystems
};