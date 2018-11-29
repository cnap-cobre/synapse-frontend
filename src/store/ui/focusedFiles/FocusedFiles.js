import {
  ADD_FOCUSED_FILE,
  CLEAR_FOCUSED_FILES,
  REMOVE_FOCUSED_FILE,
  SET_FOCUSED_FILE,
  SET_FOCUSED_FILES_LIST,
} from './types';

export function addFocusedFile(filePath) {
  return {
    type: ADD_FOCUSED_FILE,
    filePath,
  };
}

export function clearFocusedFiles() {
  return {
    type: CLEAR_FOCUSED_FILES,
  };
}

export function setFocusedFile(filePath) {
  return {
    type: SET_FOCUSED_FILE,
    filePath,
  };
}

export function setFocusedFilesList(filePathList) {
  return {
    type: SET_FOCUSED_FILES_LIST,
    filePathList,
  };
}

export function removeFocusedFile(filePath) {
  return {
    type: REMOVE_FOCUSED_FILE,
    filePath,
  };
}
