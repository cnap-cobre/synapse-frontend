import Agave from '../../services/Agave/index';
import Dropbox from '../../services/Dropbox/index';

export function fixAgaveSymlinkBug(path, name) {
  return {
    type: FIX_AGAVE_SYMLINK_BUG,
    path,
    name,
  };
}

export function symlinkCorrectionStarted(path) {
  return {
    type: SYMLINK_CORRECTION_STARTED,
    path,
  };
}

function fetchSymlinkCorrections(path) {
  // Work-around for Agave symlink-to-directory bug

  const action = (dispatch, getState) => {
    dispatch(symlinkCorrectionStarted(path));

    const files = getState().files[path].files;

    files.filter(
      item => item.type === 'file' && item.length < 1024 && 'ALLEXECUTE'.indexOf(item.permissions) !== -1,
    ).forEach((item, i) => {
      const childPath = `${path + item.name}/`;
      Agave.listFiles(childPath)
        .then((childFiles) => {
          dispatch(receiveFiles(childPath, childFiles));
          return childFiles;
        })
        .then((childFiles) => {
          dispatch(fixAgaveSymlinkBug(path, item.name));
          return childFiles;
        })
        .catch(() => {
          console.log(`${childPath} is not a directory.`);
        });
    });
  };
  action.type = 'FETCH_SYMLINK_CORRECTIONS';
  return action;
}
