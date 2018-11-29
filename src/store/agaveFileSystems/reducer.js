import * as types from './types';
import { createReducer } from '../utils';

export const initialAgaveFileSystemsState = {
  systems: [],
  loading: true,
};

export default createReducer(initialAgaveFileSystemsState, {
  [types.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING]: state => ({
    ...state,
    loading: true,
  }),
  [types.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS]: (state, action) => ({
    ...state,
    systems: action.systems,
    loading: false,
  }),
  [types.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR]: (state, action) => ({
    ...state,
    loading: false,
  }),
});
