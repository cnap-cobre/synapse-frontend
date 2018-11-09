import * as types from './userProfile/types';

export const actions = {
  pending: () => ({
    type: types.GET_USER_PROFILE_ASYNC.PENDING
  }),
  success: (userProfile) => ({
    type: types.GET_USER_PROFILE_ASYNC.SUCCESS,
    userProfile
  }),
  error: (error) => ({
    type: types.GET_USER_PROFILE_ASYNC.ERROR
  })
};