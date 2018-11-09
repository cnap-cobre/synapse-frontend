import * as types from './types';

export const initialFilesState = {};

export default function fileHistory(state = initialFilesState, action) {
  const stateForPath = state[action.path] || {};

  switch (action.type) {
    case types.GET_FILE_HISTORY_ASYNC.PENDING:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          loading: true
        }
      };
    case types.GET_FILE_HISTORY_ASYNC.SUCCESS:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          history: action.history,
          loading: false
        }
      };
    case types.GET_FILE_HISTORY_ASYNC.ERROR:
      return {
        ...state,
        [action.path]: {
          ...stateForPath,
          history: [],
          loading: false
        }
      };
    default:
      return state;
  }
}