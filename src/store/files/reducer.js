import {
  DELETE_FILE,
  FAIL_FILES, FIX_AGAVE_SYMLINK_BUG,
  INVALIDATE_FILES,
  RECEIVE_FILES,
  REQUEST_FILES, SYMLINK_CORRECTION_STARTED
} from "./actions";

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
      const files = action.files
          .filter(f => f.name !== '.')
          .map(f => ({
            ...f,
            lastModified: Date.parse(f.lastModified)
          }))
      ;
      const filesWithFullPath = files.map(f => Object.assign({}, f, {
        fullPath: '/' + f.provider + '/' + f.system + f.path
      }));

      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          files: filesWithFullPath,
          isFetching: false,
          hasFetched: true,
          didInvalidate: false,
          lastUpdated: action.receivedAt,
          symlinkCorrectionStarted: false,
        })
      });
    case FAIL_FILES:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          files: [],
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
    case FIX_AGAVE_SYMLINK_BUG:
      const fileList = stateForPath.files || [];
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          files: fileList.map(item => ({
            ...item,
            format: (action.name === item.name ? 'folder' : item.format),
            type: (action.name === item.name ? 'dir' : item.type)
          }))
        })
      });
    case SYMLINK_CORRECTION_STARTED:
      return Object.assign({}, state, {
        [action.path]: Object.assign({}, stateForPath, {
          symlinkCorrectionStarted: true
        })
      });
    default:
      return state;
  }
}