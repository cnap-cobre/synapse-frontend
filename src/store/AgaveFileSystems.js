import * as types from './agaveFileSystems/types';

export const actions = {
  pending: () => ({
    type: types.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING
  }),
  success: (systems) => ({
    type: types.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS,
    systems
  }),
  error: (error) => ({
    type: types.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR,
    error
  })
};