import * as types from '../files/types';

export const initialFileState = {};

export default function filesFlat(state = initialFileState, action) {
  switch (action.type) {
    case types.GET_FILE_LIST_ASYNC.SUCCESS:
      const filesAsArray = action.files
        .filter(f => f.name !== '.')
        .map(f => ({
          ...f,
          fullPath: `/${f.provider}/${f.system}${f.path}`,
          lastModified: Date.parse(f.lastModified),
        }));

      const filesAsObject = filesAsArray.length === 0
        ? {}
        : filesAsArray.reduce((acc, f) => ({
          ...acc,
          [f.fullPath]: f,
        }), {});

      return {
        ...state,
        ...filesAsObject,
      };
    default:
      return state;
  }
}
