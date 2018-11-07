import Agave from '../../services/Agave/index';
import Dropbox from '../../services/Dropbox/index';
import {clearFocusedFiles, removeFocusedFile, setFocusedFile} from "../FocusedFiles";

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

export function makeDirectory(path, name) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    const provider = path.split('/')[1];

    if (provider === 'dropbox') {
      return Dropbox.mkdir(csrftoken, path, name);
    } else if (provider === 'agave') {
      return Agave.mkdir(csrftoken, path, name);
    } else {
      throw "Couldn't make directory because the file system provider could not be resolved."
    }
  };

  action.type = 'MAKE_DIRECTORY';
  action.path = path;
  return action;
}

export function deleteFile(file) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(removeFocusedFile(file.fullPath));

    if (file.provider === 'dropbox') {
      return Dropbox.rm(csrftoken, file);
    } else if (file.provider === 'agave') {
      return Agave.rm(csrftoken, file);
    } else {
      throw "Couldn't delete because file system provider could not be resolved."
    }
  };
  action.type = 'DELETE_FILE';
  return action;
}

export function downloadFile(file) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    if (file.provider === 'dropbox') {
      return Dropbox.wget(csrftoken, file);
    } else if (file.provider === 'agave') {
      return Agave.wget(csrftoken, file);
    } else {
      throw "Couldn't download file because file system provider could not be resolved."
    }
  };
  action.type = 'DOWNLOAD_FILE';
  return action;
}

export function moveFile(file, newPath) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(removeFocusedFile(file.fullPath));
    dispatch(invalidateFiles(
        ['', file.system, ...newPath.split('/').slice(1, -1), ''].join('/')
    ));

    if (file.provider === 'dropbox') {
      return Dropbox.mv(csrftoken, file, newPath);
    } else if (file.provider === 'agave') {
      return Agave.mv(csrftoken, file, newPath);
    } else {
      throw "Couldn't move file because file system provider could not be resolved"
    }
  };
  action.type = 'MOVE_FILE';
  return action;
}

export function copyFile(file, newPath) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(invalidateFiles(
        [file.system, ...newPath.split('/').slice(0, -1), ''].join('/')
    ));

    if (file.provider === 'dropbox') {
      return Dropbox.cp(csrftoken, file, newPath);
    } else if (file.provider === 'agave') {
      return Agave.cp(csrftoken, file, newPath);
    } else {
      throw "Couldn't copy file because file system provider could not be resolved"
    }
  };
  action.type = 'COPY_FILE';
  return action;
}

export function renameFile(file, newName) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    dispatch(removeFocusedFile(file.fullPath));
    dispatch(invalidateFiles(
        [file.fullPath.split('/').slice(0,-1), ''].join('/')
    ));

    if (file.provider === 'dropbox') {
      return Dropbox.rename(csrftoken, file, newName);
    } else if (file.provider === 'agave') {
      return Agave.rename(csrftoken, file, newName);
    } else {
      throw "Couldn't rename file because file system provider could not be resolved"
    }
  };
  action.type = 'RENAME_FILE';
  return action;
}

export function uploadFile(file, path) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;

    const provider = path.split('/')[1];

    if(provider === 'dropbox') {
      return Dropbox.uploadFile(csrftoken, file, path);
    } else if (provider === 'agave') {
      return Agave.uploadFile(csrftoken, file, path);
    } else {
      throw "Couldn't upload file because file system provider could not be resolved.";
    }
  };
  action.type = 'UPLOAD_FILE';
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

    const fileSystems = getState().fileSystems.systems;
    const activeFileSystem = fileSystems.filter((fs) => {
      const tokens = path.split('/');
      return fs.provider === tokens[1] && fs.id === tokens[2];
    });

    // If we don't have a match for the active file system
    // wait just a bit while the systems may still be loading.
    if (activeFileSystem.length !== 1) {
      return new Promise((resolve, reject) => {
        console.log(new Error().stack);
        setTimeout(() => {
          resolve(
            dispatch(fetchFiles(path))
          );
        }, 500);
      });
    }

    if (activeFileSystem[0].provider === 'dropbox') {
      return Dropbox.listFiles(csrftoken, path)
          .then(files => dispatch(receiveFiles(path, files)))
          .catch(response => dispatch(failFiles(path, response.status)));
    } else if(activeFileSystem[0].provider === 'agave') {
      const query = Agave.listFiles(path)
          .then(files => dispatch(receiveFiles(path, files)))
          .then((x) => {
            return x;
          });

      // Trigger symlink directory corrections
      query.then(() => dispatch(fetchSymlinkCorrections(path)));

      return query.catch(response => dispatch(failFiles(path, response.status)));
    } else {
      throw "Unmatched file system provider";
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