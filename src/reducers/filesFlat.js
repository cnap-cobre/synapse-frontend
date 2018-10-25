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
      const filesAsArray = action.files
          .filter(f => f.name !== '.')
          .map(f => ({
            ...f,
            fullPath: '/' + f.provider + '/' + f.system + f.path,
            lastModified: Date.parse(f.lastModified),
          }));
      console.log("filesAsArray", filesAsArray);

      const filesAsObject = filesAsArray.length === 0
          ? {}
          : filesAsArray.reduce((acc, f) => {
            return {
              ...acc,
              [f.fullPath]: f
            }
          }, {});

      console.log("filesAsObject", filesAsObject);

      return {
        ...state,
        ...filesAsObject,
      };
    default:
      return state;
  }
}