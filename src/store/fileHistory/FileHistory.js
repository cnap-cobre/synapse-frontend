import * as types from './types';
import {createAction} from "../utils";

export const fileHistoryActions = {
  ifNeeded: (path) =>
      createAction(types.GET_FILE_HISTORY_ASYNC.IF_NEEDED, { path }),
  pending: (path) =>
      createAction(types.GET_FILE_HISTORY_ASYNC.PENDING, { path }),
  success: (path, history) =>
      createAction(types.GET_FILE_HISTORY_ASYNC.SUCCESS, { path, history }),
  error: (path) =>
      createAction(types.GET_FILE_HISTORY_ASYNC.ERROR, { path })
};