import {
  INVALIDATE_AGAVE_FILE_SYSTEMS,
  RECEIVE_AGAVE_FILE_SYSTEMS,
  REQUEST_AGAVE_FILE_SYSTEMS
} from "../actions/agaveFileSystems";

export const initialAgaveFileSystemsState = {
  systems: [],
  isFetching: false,
  didInvalidate: false,
  lastUpdated: 0
};

export default function agaveFileSystems(state = initialAgaveFileSystemsState, action) {
  switch (action.type) {
    case INVALIDATE_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        systems: action.systems,
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}