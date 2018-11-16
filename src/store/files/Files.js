import * as types from './types'
import {createAction} from "../utils";

export const fileListActions = {
  ifNeeded: (path) =>
      createAction(types.GET_FILE_LIST_ASYNC.IF_NEEDED, { path }),
  pending: (path) =>
      createAction(types.GET_FILE_LIST_ASYNC.PENDING, { path }),
  success: (path, files) =>
      createAction(types.GET_FILE_LIST_ASYNC.SUCCESS, { path, files }),
  error: (path, error) =>
      createAction(types.GET_FILE_LIST_ASYNC.ERROR, { path, error })
};

export const fixAgaveSymplinkBugActions = {
  pending: (path) => ({
    type: types.FIX_AGAVE_SYMLINK_BUG.PENDING,
    path
  }),
  // success: () => ({
  //   type: types.FIX_AGAVE_SYMLINK_BUG.SUCCESS,
  //
  // }),
  // error: () => ({
  //   type: types.FIX_AGAVE_SYMLINK_BUG.ERROR
  // })
};

export const fileActions = {
  copyFile: (file, newPath) => ({
    type: types.COPY_FILE,
    file,
    newPath
  }),
  deleteFile: (file) => ({
    type: types.DELETE_FILE,
    file
  }),
  moveFile: (file, newPath) => ({
    type: types.MOVE_FILE,
    file,
    newPath
  }),
  renameFile: (file, newName) => ({
    type: types.RENAME_FILE,
    file,
    newName
  }),
  uploadFile: (file, path) => ({
    type: types.UPLOAD_FILE,
    file,
    path
  })
};

export const directoryActions = {
  makeDirectory: (path, name) => ({
    type: types.MAKE_DIRECTORY,
    path,
    name
  })
};
