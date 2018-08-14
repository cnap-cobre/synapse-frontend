import Agave from '../services/Agave';
import Dropbox from '../services/Dropbox';
import {setFocusedFile} from "./focusedFile";

export const REQUEST_FILES = 'REQUEST_FILES';
export const RECEIVE_FILES = 'RECEIVE_FILES';
export const FAIL_FILES = 'FAIL_FILES';
export const INVALIDATE_FILES = 'INVALIDATE_FILES';
export const FIX_AGAVE_SYMLINK_BUG = 'FIX_AGAVE_SYMLINK_BUG';
export const SYMLINK_CORRECTION_STARTED = 'SYMLINK_CORRECTION_STARTED';

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

export function fixAgaveSymlinkBug(path, name) {
  return {
    type: FIX_AGAVE_SYMLINK_BUG,
    path,
    name
  }
}

export function symlinkCorrectionStarted(path) {
  return {
    type: SYMLINK_CORRECTION_STARTED,
    path
  }
}

export function deleteFile(file) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(setFocusedFile(''));

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

export function moveFile(file, newPath) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.system === 'dropbox') {
      return Dropbox.mv(csrftoken, file, newPath);
    } else {
      return Agave.mv(csrftoken, file, newPath);
    }
  };
  action.type = 'MOVE_FILE';
  return action;
}

export function copyFile(file, newPath) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.system === 'dropbox') {
      return Dropbox.cp(csrftoken, file, newPath);
    } else {
      return Agave.cp(csrftoken, file, newPath);
    }
  };
  action.type = 'MOVE_FILE';
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

function fetchSymlinkCorrections(path) {
  // Work-around for Agave symlink-to-directory bug

  const action = (dispatch, getState) => {
    dispatch(symlinkCorrectionStarted(path));

    const files = getState().files[path].files;

    files.filter(
        item => item.type === 'file' && item.length < 1024 && 'ALLEXECUTE'.indexOf(item.permissions) !== -1
    ).forEach((item, i) => {
      const childPath = path + item.name + '/';
      Agave.listFiles(childPath)
          .then(childFiles => {
            dispatch(receiveFiles(childPath, childFiles))
            return childFiles;
          })
          .then(childFiles => {
            dispatch(fixAgaveSymlinkBug(path, item.name))
            return childFiles;
          })
          .catch(() => {
            console.log(childPath + ' is not a directory.');
          });
    });
  };
  action.type = 'FETCH_SYMLINK_CORRECTIONS';
  return action;
}

function fetchFiles(path) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(requestFiles(path));

    if (path.indexOf('/dropbox') === 0) {
      return Dropbox.listFiles(csrftoken, path.slice('/dropbox'.length))
          .then(files => dispatch(receiveFiles(path, files)))
          .catch(response => dispatch(failFiles(path, response.status)));
    } else {
      // Any agave directory listings
      const query = Agave.listFiles(path)
          .then(files => dispatch(receiveFiles(path, files)));

      // Trigger symlink directory corrections
      query.then(() => dispatch(fetchSymlinkCorrections(path)));

      return query.catch(response => dispatch(failFiles(path, response.status)));
    }
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