import {
  FAIL_AGAVE_FILE_SYSTEMS,
  INVALIDATE_AGAVE_FILE_SYSTEMS,
  RECEIVE_AGAVE_FILE_SYSTEMS,
  REQUEST_AGAVE_FILE_SYSTEMS
} from "../actions/agaveFileSystems";

export const initialAgaveFileSystemsState = {
  systems: [],
  isFetching: false,
  hasFetched: false,
  didInvalidate: false,
  lastUpdated: 0,
  errorMessage: ""
};

export default function agaveFileSystems(state = initialAgaveFileSystemsState, action) {
  switch (action.type) {
    case REQUEST_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        systems: action.systems,
        isFetching: false,
        hasFetched: true,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });
    case FAIL_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        systems: [],
        isFetching: false,
        hasFetched: true,
        lastUpdated: action.receivedAt,
        errorMessage: action.message
      });
    case INVALIDATE_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    default:
      return state;
  }
}