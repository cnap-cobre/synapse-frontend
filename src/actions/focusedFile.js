export const SET_FOCUSED_FILE = 'SET_FOCUSED_FILE';

export function setFocusedFile(filePath) {
  return {
    type: SET_FOCUSED_FILE,
    filePath
  };
}