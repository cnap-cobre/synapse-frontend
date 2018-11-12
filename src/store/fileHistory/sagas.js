import * as types from './types';
import Agave from '../../services/Agave/index';
import Dropbox from '../../services/Dropbox';
import { fileHistoryActions } from '../FileHistory';
import { all, call, put, select, takeEvery } from 'redux-saga/effects';

const getCsrf = state => state.csrf.token;
const getFileHistoryAtPath = (state, path) => state.fileHistory[path];

const resolveProviderService = path => {
  switch (path.split('/')[1]) {
    case 'agave':
      return Agave;
    case 'dropbox':
      return Dropbox;
    default:
      console.log(path.split('/'));
      throw "File provider not resolved from path";
  }
};

function* getFileHistoryIfNeeded(action) {
  try{
    const fileHistoryState = yield select(getFileHistoryAtPath, action.path);
    if (fileHistoryState === undefined) {
      yield put(fileHistoryActions.pending(action.path))
    }
  } catch (e) {
    console.log(e);
    yield put(fileHistoryActions.pending(action.path))
  }
}

function* getFileHistory(action) {
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    const fileHistory = yield call(ProviderService.fileHistory, csrfToken, action.path);
    yield put(fileHistoryActions.success(action.path, fileHistory));
  } catch (e) {
    console.log(e);
    yield put(fileHistoryActions.error(action.path))
  }
}

export default function* () {
  yield all([
      takeEvery(types.GET_FILE_HISTORY_ASYNC.IF_NEEDED, getFileHistoryIfNeeded),
      takeEvery(types.GET_FILE_HISTORY_ASYNC.PENDING, getFileHistory)
  ])
}