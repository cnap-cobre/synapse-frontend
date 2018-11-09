import * as types from './types';
import { all, put, takeEvery } from 'redux-saga/effects';
import {fileHistoryActions} from '../FileHistory';

function *getFileHistory(action) {
  console.log("CKAE", action);
  yield put(fileHistoryActions.pending(action.filePath));
}

export default function* () {
  yield all([
    takeEvery(types.SET_FOCUSED_FILE, getFileHistory)
  ])
}