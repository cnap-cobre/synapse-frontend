import Agave from '../services/Agave';
import Dropbox from '../services/Dropbox';

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const FAIL_FILES = 'FAIL_FILES';
export const INVALIDATE_FILES = 'INVALIDATE_FILES';
export const DELETE_FILE = 'DELETE_FILE';

export function requestFiles(path) {
  return {
    type: REQUEST_FILES,
    path
  }
}

export function receiveFiles(path, files) {
  return {
    type: RECEIVE_FILES,
    path,
    files,
    receivedAt: Date.now()
  }
}

export function failFiles(path, errorCode) {
  return {
    type: FAIL_FILES,
    path,
    errorCode,
    receivedAt: Date.now()
  }
}

export function invalidateFiles(path) {
  return {
    type: INVALIDATE_FILES,
    path
  }
}

export function deleteFile(filePath) {
  return {
    type: DELETE_FILE,
    filePath
  }
}

function fetchFiles(path) {
  return (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(requestFiles(path));

    let query;

    if (path.indexOf('/dropbox') === 0) {
      query = Dropbox.list(csrftoken, path.slice('/dropbox'.length));
    } else {
      query = Agave.list(path)
    }

    return query.then(files => dispatch(receiveFiles(path, files)))
        .catch(response => dispatch(failFiles(path, response.status)));
  }
}

function shouldFetchFiles(state, path) {
  const files = state.files;
  if (files[path] === undefined) {
    return true;
  } else if (files[path].isFetching) {
    return false;
  } else {
    return files[path].didInvalidate;
  }
}

export function fetchFilesIfNeeded(path) {
  return (dispatch, getState) => {
    if (shouldFetchFiles(getState(), path)) {
      return dispatch(fetchFiles(path));
    }
  }
}