import * as types from './types';
import {fileHistoryActions} from '../../fileHistory/FileHistory';
import { all, put, takeEvery } from 'redux-saga/effects';

function *getFileHistory(action) {
  yield put(fileHistoryActions.ifNeeded(action.filePath));
}

export default function* () {
  yield all([
    // takeEvery(types.SET_FOCUSED_FILE, getFileHistory)
  ])
}