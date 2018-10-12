import Agave from '../services/Agave';

export const REQUEST_AGAVE_FILE_SYSTEMS = 'REQUEST_AGAVE_FILE_SYSTEMS';
export const RECEIVE_AGAVE_FILE_SYSTEMS = 'RECEIVE_AGAVE_FILE_SYSTEMS';
export const FAIL_AGAVE_FILE_SYSTEMS = 'FAIL_AGAVE_FILE_SYSTEMS';
export const INVALIDATE_AGAVE_FILE_SYSTEMS = 'INVALIDATE_AGAVE_FILE_SYSTEMS';

export function requestAgaveFileSystems() {
  return {
    type: REQUEST_AGAVE_FILE_SYSTEMS
  }
}

export function receiveAgaveFileSystems(json) {
  return {
    type: RECEIVE_AGAVE_FILE_SYSTEMS,
    systems: json.result.map((sys) => {
      return {
        ...sys,
        provider: 'agave'
      };
    }),
    receivedAt: Date.now()
  }
}

export function failAgaveFileSystems(message) {
  return {
    type: FAIL_AGAVE_FILE_SYSTEMS,
    message,
    receivedAt: Date.now()
  }
}

export function invalidateAgaveFileSystems() {
  return {
    type: INVALIDATE_AGAVE_FILE_SYSTEMS
  }
}

function fetchAgaveFileSystems() {
  const action = dispatch => {
    dispatch(requestAgaveFileSystems());

    return Agave.listFileSystems()
        .then(json => dispatch(receiveAgaveFileSystems(json)))
        .catch(response => {
          if (response.status === 403) {
            dispatch(failAgaveFileSystems("Unauthorized"))
          } else if (response.status > 404) {
            dispatch(failAgaveFileSystems("Error"))
          }
        })
  };
  action.type = 'FETCH_AGAVE_FILE_SYSTEMS';
  return action;
}

function shouldFetchAgaveFileSystems(state) {
  const agaveFileSystems = state.agaveFileSystems;
  if (agaveFileSystems.isFetching) {
    return false;
  } else if (agaveFileSystems.systems.length === 0) {
    return true;
  } else {
    return agaveFileSystems.didInvalidate;
  }
}

export function fetchAgaveFileSystemsIfNeeded() {
  const action = (dispatch, getState) => {
    if (shouldFetchAgaveFileSystems(getState())) {
      return dispatch(fetchAgaveFileSystems());
    } else {
      return Promise.resolve();
    }
  };
  action.type = 'FETCH_AGAVE_FILE_SYSTEMS_IF_NEEDED';
  return action;
}