import Agave from '../services/Agave';
import Dropbox from '../services/Dropbox';

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const FAIL_FILES = 'FAIL_FILES';
export const INVALIDATE_FILES = 'INVALIDATE_FILES';

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

export function deleteFile(file) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.system === 'dropbox') {
      return Dropbox.rm(csrftoken, file);
    } else {
      return Agave.rm(csrftoken, file);
    }
  };
  action.type = 'DELETE_FILE';
  return action;
}

export function downloadFile(file) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.system === 'dropbox') {
      return Dropbox.wget(csrftoken, file);
    } else {
      return Agave.wget(csrftoken, file);
    }
  };
  action.type = 'DOWNLOAD_FILE';
  return action;
}

export function renameFile(file, newName) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.system === 'dropbox') {
      return Dropbox.rename(csrftoken, file, newName);
    } else {
      return Agave.rename(csrftoken, file, newName);
    }
  };
  action.type = 'RENAME_FILE';
  return action;
}

function fetchFiles(path) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(requestFiles(path));

    let query;

    if (path.indexOf('/dropbox') === 0) {
      query = Dropbox.listFiles(csrftoken, path.slice('/dropbox'.length));
    } else {
      query = Agave.listFiles(path)
    }

    return query.then(files => dispatch(receiveFiles(path, files)))
        .catch(response => dispatch(failFiles(path, response.status)));
  };
  action.type = 'FETCH_FILES';
  return action;
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
  const action = (dispatch, getState) => {
    if (shouldFetchFiles(getState(), path)) {
      return dispatch(fetchFiles(path));
    }
  };
  action.type = 'FETCH_FILES_IF_NEEDED';
  return action;
}