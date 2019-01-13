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
  [types.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR]: state => ({
    ...state,
    loading: false,
  }),
});

export const getBeocatSystems = (store) => {
  const { agaveFileSystems } = store;
  const { systems } = agaveFileSystems;
  return systems && systems.length > 0 && systems.filter(
    sys => sys.id.indexOf('beocat') !== -1,
  );
};

export const getBeocatConnected = store => getBeocatSystems(store).length > 0;
