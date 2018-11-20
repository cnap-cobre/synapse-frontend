import * as types from './types';
import Agave from '../../services/Agave/index';
import Dropbox from '../../services/Dropbox/index';
import {fileListActions} from './Files';
import {removeFocusedFile} from "../ui/focusedFiles/FocusedFiles";
import { all, call, put, select, takeEvery } from 'redux-saga/effects';


const getCsrf = state => state.csrf.token;
const getFileStateAtPath = (state, path) => state.files[path];

const transformFileListing = files => files.filter(
    f => f.name !== '.'
).map(
    f => ({
      ...f,
      lastModified: Date.parse(f.lastModified),
      fullPath: '/' + f.provider + '/' + f.system + f.path
    })
);

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

function* getFileListIfNeeded(action) {
  try{
    const fileState = yield select(getFileStateAtPath, action.path);
    if (fileState === undefined) {
      yield put(fileListActions.pending(action.path))
    }
  } catch (e) {
    console.log(e);
    // This should never run, but
    // if we somehow fail, we should probably fetch the files anyway
    yield put(fileListActions.pending(action.path))
  }
}

function* getFileList(action) {
  try{
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

function* copyFile(action) {
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.cp, csrfToken, action.file, action.newPath);
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* deleteFile(action) {
  try{
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
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.mv, csrfToken, action.file, action.newPath);
    yield put(removeFocusedFile(action.file.fullPath))
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* renameFile(action) {
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.file.fullPath);
    yield call(ProviderService.rename, csrfToken, action.file, action.newName);
    yield put(removeFocusedFile(action.file.fullPath)); // TODO: select file under new name if successful
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* uploadFile(action) {
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    yield call(ProviderService.uploadFile, csrfToken, action.file, action.path);
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}

function* makeDirectory(action) {
  try{
    const csrfToken = yield select(getCsrf);
    const ProviderService = resolveProviderService(action.path);
    yield call(ProviderService.mkdir, csrfToken, action.path, action.name)
  } catch (e) {
    console.log(e);
    // Do something to handle the error
  }
}


export default function* () {
  yield all([
    takeEvery(types.GET_FILE_LIST_ASYNC.PENDING, getFileList),
    takeEvery(types.GET_FILE_LIST_ASYNC.IF_NEEDED, getFileListIfNeeded),

    takeEvery(types.COPY_FILE, copyFile),
    takeEvery(types.DELETE_FILE, deleteFile),
    takeEvery(types.MOVE_FILE, moveFile),
    takeEvery(types.RENAME_FILE, renameFile),
    takeEvery(types.UPLOAD_FILE, uploadFile),

    takeEvery(types.MAKE_DIRECTORY, makeDirectory)
  ]);
}
