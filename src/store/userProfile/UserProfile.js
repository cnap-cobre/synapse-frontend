import * as types from './types';
import {createAction} from "../utils";

export const actions = {
  ifNeeded: () =>
      createAction(types.GET_USER_PROFILE_ASYNC.IF_NEEDED),
  pending: () =>
      createAction(types.GET_USER_PROFILE_ASYNC.PENDING),
  success: (userProfile) =>
      createAction(types.GET_USER_PROFILE_ASYNC.SUCCESS, { userProfile }),
  error: (error) =>
      createAction(types.GET_USER_PROFILE_ASYNC.ERROR, { error })
};