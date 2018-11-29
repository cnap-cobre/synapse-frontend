import {
  all, call, put, select, takeEvery,
} from 'redux-saga/effects';
import * as Synapse from '../../services/Synapse';
import * as types from './types';

const getCsrf = state => state.csrf.token;

function* initTransferFilesBatch(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const transferFilesResponse = yield call(Synapse.initiateTransfer, csrfToken, action.fileList);
    // yield put()
  } catch (e) {
    console.log(e);
    // yield put()
  }
}

export default function* () {
  yield all([
    takeEvery(types.START_TRANSFER, initTransferFilesBatch),
  ]);
}
