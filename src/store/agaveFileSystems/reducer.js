import * as types from './types';

export const initialAgaveFileSystemsState = {
  systems: [],
  loading: true
};

export default function agaveFileSystems(state = initialAgaveFileSystemsState, action) {
  switch (action.type) {
    case types.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING:
      return {
        ...state,
        loading: true
      };
    case types.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS:
      return {
        ...state,
        loading: false,
        systems: action.systems
      };
    case types.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}