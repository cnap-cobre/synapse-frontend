import {
  FAIL_FILES,
  INVALIDATE_FILES,
  RECEIVE_FILES,
  REQUEST_FILES
} from "../actions/files";

export const initialFilesState = {};

export default function files(state = initialFilesState, action) {
  const stateForPath = state[action.path] || {};

  switch (action.type) {
    case REQUEST_FILES:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          isFetching: true,
          didInvalidate: false
        })
      });
    case RECEIVE_FILES:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          files: action.files.filter(f => f.name !== '.'),
          isFetching: false,
          hasFetched: true,
          didInvalidate: false,
          lastUpdated: action.receivedAt,
        })
      });
    case FAIL_FILES:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          isFetching: false,
          hasFetched: true,
          lastUpdated: action.receivedAt,
          errorCode: action.errorCode
        })
      });
    case INVALIDATE_FILES:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          didInvalidate: true
        })
      });
    default:
      return state;
  }
}