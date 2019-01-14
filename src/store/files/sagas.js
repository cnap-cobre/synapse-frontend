import {
  all, call, put, select, takeEvery, cancel, fork,
} from 'redux-saga/effects';
import { delay } from 'redux-saga'
import * as types from './types';
import Agave from '../../services/Agave/index';
import Dropbox from '../../services/Dropbox/index';
import { fileListActions } from './Files';
import { removeFocusedFile } from '../ui/focusedFiles/FocusedFiles';

/**
 * Quick and dirty global (within this file) record for which paths are pending
 * Example
 *
 * let ids = {
 *   '/agave/beocat-prod/homes/kmdice/asdf/asdf/': true,
 *   '/dropbox/home/asdf/': true,
 * }
 */
const pendingPaths = {};
const pendingTasks = {};

// Selectors
const getCsrf = state => state.csrf.token;
const getFileStateAtPath = (state, path) => state.files[path];

const transformFileListing = files => files.filter(
  f => f.name !== '.',
).map(
  f => ({
    ...f,
    lastModified: f.lastModified ? Date.parse(f.lastModified) : null,
    fullPath: `/${f.provider}/${f.system}${f.path}`,
  }),
);

const resolveProviderService = (path) => {
  switch (path.split('/')[1]) {
    case 'agave':
      return Agave;
    case 'dropbox':
      return Dropbox;
    default:
      console.log(path.split('/'));
      throw Error('File provider not resolved from path');
  }
};

function* getFileListIfNeeded(action) {
  try {
    const fileState = yield select(getFileStateAtPath, action.path);
    if (fileState === undefined) {
      yield put(fileListActions.pending(action.path));
    }
  } catch (e) {
    console.log(e);
    // This should never run, but
    // if we somehow fail, we should probably fetch the files anyway
    yield put(fileListActions.pending(action.path));
  }
}

function* getFileList(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    const files = yield call(ProviderService.listFiles, csrfToken, action.path);
    const transformedFiles = transformFileListing(files);
    yield put(fileListActions.success(action.path, transformedFiles));
  } catch (e) {
    console.log(e);
    yield put(fileListActions.error(action.path, e));
  }
}

function* debounceGetFileList(action) {
  const { path } = action;

  yield call(delay, 1000);
  yield call(getFileList, action);

  delete pendingPaths[path];
  delete pendingTasks[path];
}

function* accumulateGetFileList(action) {
  const { path } = action;

  pendingPaths[path] = true;
  if (pendingTasks[path]) {
    yield cancel(pendingTasks[path]);
  }
  pendingTasks[path] = yield fork(debounceGetFileList, action);
}

function* copyFile(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.cp, csrfToken, action.file, action.newPath);

    // refresh directory listings for source and destination
    const destinationDir = ['', action.file.provider, action.file.system, ...action.newPath.split('/').slice(1, -1), ''].join('/');

    yield put(fileListActions.pending(destinationDir));
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* deleteFile(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.rm, csrfToken, action.file);
    yield put(removeFocusedFile(action.file.fullPath));
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* moveFile(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield put(removeFocusedFile(action.file.fullPath));
    yield call(ProviderService.mv, csrfToken, action.file, action.newPath);
    console.log('pizza', action)

    // refresh directory listings for source and destination
    const sourceDir = [...action.file.fullPath.split('/').slice(0, -1), ''].join('/');
    const destinationDir = ['', action.file.provider, action.file.system, ...action.newPath.split('/').slice(1, -1)].join('/');

    yield put(fileListActions.pending(sourceDir));
    yield put(fileListActions.pending(destinationDir));
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* renameFile(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.rename, csrfToken, action.file, action.newName);

    // TODO: select file under new name if successful
    yield put(removeFocusedFile(action.file.fullPath));
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* uploadFile(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    yield call(ProviderService.uploadFile, csrfToken, action.file, action.path);
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* makeDirectory(action) {
  try {
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    yield call(ProviderService.mkdir, csrfToken, action.path, action.name);
    yield put(fileListActions.pending(action.path));
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}


export default function* () {
  yield all([
    takeEvery(types.GET_FILE_LIST_ASYNC.PENDING, accumulateGetFileList),
    takeEvery(types.GET_FILE_LIST_ASYNC.IF_NEEDED, getFileListIfNeeded),

    takeEvery(types.COPY_FILE, copyFile),
    takeEvery(types.DELETE_FILE, deleteFile),
    takeEvery(types.MOVE_FILE, moveFile),
    takeEvery(types.RENAME_FILE, renameFile),
    takeEvery(types.UPLOAD_FILE, uploadFile),

    takeEvery(types.MAKE_DIRECTORY, makeDirectory),
  ]);
}
