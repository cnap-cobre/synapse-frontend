import * as agaveFilesystemTypes from '../agaveFileSystems/types';
import * as userProfileTypes from '../userProfile/types';


export const initialFileSystemsState = {
  systems: [],
  loading: false
};

export default function fileSystems(state = initialFileSystemsState, action) {
  const nonAgaveSystems = state.systems.filter(
      sys => sys.provider !== 'agave'
  );
  const nonDropboxSystems = state.systems.filter(
      sys => sys.provider !== 'dropbox'
  );

  switch (action.type) {
    case agaveFilesystemTypes.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING:
      return {
        ...state,
        loading: true
      };
    case agaveFilesystemTypes.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS:
      const agaveSystems = action.systems;
      return {
        ...state,
        loading: false,
        systems: [
            ...agaveSystems,
            ...nonAgaveSystems
        ]
      };
    case agaveFilesystemTypes.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR:
      return {
        ...state,
        loading: false,
      };
    case userProfileTypes.GET_USER_PROFILE_ASYNC.SUCCESS:
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