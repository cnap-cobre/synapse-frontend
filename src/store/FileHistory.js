import * as types from './fileHistory/types';

export const fileHistoryActions = {
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