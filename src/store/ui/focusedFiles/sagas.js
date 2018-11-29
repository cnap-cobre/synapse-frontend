import { all, put, takeEvery } from 'redux-saga/effects';
import * as types from './types';
import { fileHistoryActions } from '../../fileHistory/FileHistory';

function* getFileHistory(action) {
  yield put(fileHistoryActions.ifNeeded(action.filePath));
}

export default function* () {
  yield all([
    // takeEvery(types.SET_FOCUSED_FILE, getFileHistory)
  ]);
}
