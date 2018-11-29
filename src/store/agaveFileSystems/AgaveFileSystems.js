import * as types from './types';
import { createAction } from '../utils';

export const actions = {
  ifNeeded: () => createAction(types.GET_AGAVE_FILE_SYSTEMS_ASYNC.IF_NEEDED),
  pending: () => createAction(types.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING),
  success: systems => createAction(types.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS, { systems }),
  error: error => createAction(types.GET_AGAVE_FILE_SYSTEMS_ASYNC.ERROR, { error }),
};
