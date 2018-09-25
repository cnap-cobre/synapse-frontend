export const ADD_FOCUSED_FILE = 'ADD_FOCUSED_FILE';
export const SET_FOCUSED_FILE = 'SET_FOCUSED_FILE';
export const REMOVE_FOCUSED_FILE = 'REMOVE_FOCUSED_FILED';

export function addFocusedFile(filePath) {
  return {
    type: ADD_FOCUSED_FILE,
    filePath
  };
}

export function setFocusedFile(filePath) {
  return {
    type: SET_FOCUSED_FILE,
    filePath
  };
}

export function removeFocusedFile(filePath) {
  return {
    type: REMOVE_FOCUSED_FILE,
    filePath
  };
}