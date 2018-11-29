import { fetchErrorThrower, fetchToJson } from '../../util/FetchUtils';

const listFileSystems = () => fetch('/agave/systems/v2/', {
  credentials: 'same-origin',
})
// Throw a proper error
  .then(fetchErrorThrower)
  .then(fetchToJson)

  .then(response => response.result)

// Add provider property
  .then(list => (list.map((file) => {
    file.provider = 'agave';
    return file;
  })));

const addFileSystem = (csrftoken, config) => fetch('/agave/systems/v2/', {
  body: JSON.stringify(config).replace(/!!!/g, '\\n'),
  credentials: 'same-origin',
  method: 'POST',
  headers: {
    'X-CSRFToken': csrftoken,
    'content-type': 'application/json',
  },
}).then(fetchErrorThrower)
  .then(fetchToJson);

export default {
  addFileSystem,
  listFileSystems,
};
