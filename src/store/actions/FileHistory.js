import * as types from '../private/fileHistory/types';

export const fileHistoryActions = {
  ifNeeded: (path) => ({
    type: types.GET_FILE_HISTORY_ASYNC.IF_NEEDED,
    path
  }),
  pending: (path) => ({
    type: types.GET_FILE_HISTORY_ASYNC.PENDING,
    path
  }),
  success: (path, history) => ({
    type: types.GET_FILE_HISTORY_ASYNC.SUCCESS,
    path,
    history
  }),
  error: (path) => ({
    type: types.GET_FILE_HISTORY_ASYNC.ERROR,
    path
  })
};