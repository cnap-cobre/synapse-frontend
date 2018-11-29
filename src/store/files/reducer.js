import * as types from './types';

export const initialFilesState = {};

export default function files(state = initialFilesState, action) {
  const stateForPath = state[action.path] || {};

  switch (action.type) {
    case types.GET_FILE_LIST_ASYNC.PENDING:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          loading: true,
        },
      };
    case types.GET_FILE_LIST_ASYNC.SUCCESS:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          loading: false,
          files: action.files,
        },
      };
    case types.GET_FILE_LIST_ASYNC.ERROR:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          loading: false,
        },
      };
    // case FIX_AGAVE_SYMLINK_BUG:
    //   const fileList = stateForPath.files || [];
    //   return Object.assign({}, state, {
    //     [action.path]: Object.assign({}, stateForPath, {
    //       files: fileList.map(item => ({
    //         ...item,
    //         format: (action.name === item.name ? 'folder' : item.format),
    //         type: (action.name === item.name ? 'dir' : item.type)
    //       }))
    //     })
    //   });
    // case SYMLINK_CORRECTION_STARTED:
    //   return Object.assign({}, state, {
    //     [action.path]: Object.assign({}, stateForPath, {
    //       symlinkCorrectionStarted: true
    //     })
    //   });
    default:
      return state;
  }
}
