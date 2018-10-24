import {
  DELETE_FILE,
  FAIL_FILES, FIX_AGAVE_SYMLINK_BUG,
  INVALIDATE_FILES,
  RECEIVE_FILES,
  REQUEST_FILES, SYMLINK_CORRECTION_STARTED
} from "../actions/files";

export const initialFileState = {};

export default function filesFlat(state = initialFileState, action) {
  switch (action.type) {
    case RECEIVE_FILES:
      const files = action.files
          .filter(f => f.name !== '.')
          .map(f => ({
            ...f,
            fullPath: '/' + f.provider + '/' + f.system + f.path,
            lastModified: Date.parse(f.lastModified),
          }))
          .reduce((acc, f) => {
            return {
              ...acc,
              [f.fullPath]: f
            }
          });
      return {
        ...state,
        ...files,
      };
    default:
      return state;
  }
}