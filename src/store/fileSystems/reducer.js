import {RECEIVE_PROFILE} from "../userProfile/actions";
import {
  FAIL_AGAVE_FILE_SYSTEMS,
  INVALIDATE_AGAVE_FILE_SYSTEMS, RECEIVE_AGAVE_FILE_SYSTEMS,
  REQUEST_AGAVE_FILE_SYSTEMS
} from "../agaveFileSystems/actions";

export const initialFileSystemsState = {
  systems: [],
  isFetching: false,
  hasFetched: false,
  didInvalidate: false,
  lastUpdated: 0,
  errorMessage: ""
};

export default function fileSystems(state = initialFileSystemsState, action) {
  const nonAgaveSystems = state.systems.filter(
      sys => sys.provider !== 'agave'
  );
  const nonDropboxSystems = state.systems.filter(
      sys => sys.provider !== 'dropbox'
  );

  switch (action.type) {
    case REQUEST_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_AGAVE_FILE_SYSTEMS:
      const agaveSystems = action.systems;
      return Object.assign({}, state, {
        systems: [
          ...agaveSystems,
          ...nonAgaveSystems
        ],
        isFetching: false,
        hasFetched: true,
        didInvalidate: false,
        lastUpdated: action.receivedAt
      });
    case FAIL_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        systems: nonAgaveSystems,
        isFetching: false,
        hasFetched: true,
        lastUpdated: action.receivedAt,
        errorMessage: action.message
      });
    case INVALIDATE_AGAVE_FILE_SYSTEMS:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case RECEIVE_PROFILE:
      const dropboxSystems = [];
      if (action.userProfile.dropbox.length !== 0) {
        dropboxSystems.push({
          id: 'home',
          provider: 'dropbox',
          description: 'Dropbox File System',
          name: 'Dropbox',
          status: 'UP',
          type: 'STORAGE',
          public: false
        });
      }
      return Object.assign({}, state, {
        systems: [
            ...nonDropboxSystems,
            ...dropboxSystems
        ]
      });
    default:
      return state;
  }
}