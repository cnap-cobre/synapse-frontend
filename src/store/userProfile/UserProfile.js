// @flow

import * as types from './types';
import { createAction } from '../utils';
import type { userProfileStateType } from '../../types/userProfileTypes';

export const actions = {
  ifNeeded: () => createAction(types.GET_USER_PROFILE_ASYNC.IF_NEEDED),
  pending: () => createAction(types.GET_USER_PROFILE_ASYNC.PENDING),
  success: (userProfile: userProfileStateType) => createAction(
    types.GET_USER_PROFILE_ASYNC.SUCCESS, { userProfile },
  ),
  error: (error: any) => createAction(types.GET_USER_PROFILE_ASYNC.ERROR, { error }),
};
