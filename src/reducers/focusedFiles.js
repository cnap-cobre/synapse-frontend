import {ADD_FOCUSED_FILE, CLEAR_FOCUSED_FILES, REMOVE_FOCUSED_FILE, SET_FOCUSED_FILE, SET_FOCUSED_FILES_LIST} from "../actions/focusedFiles";

const initialFocusedFileState = {
  list: []
};

export default function focusedFile(state = initialFocusedFileState, action) {
  const currentFocusedFilesList = state.list;
  switch (action.type) {
    case ADD_FOCUSED_FILE:
      return Object.assign({}, state, {
        list: [
          ...currentFocusedFilesList,
          action.filePath
        ]
      });
    case CLEAR_FOCUSED_FILES:
      return Object.assign({}, state, {
        list: []
      });
    case REMOVE_FOCUSED_FILE:
      return Object.assign({}, state, {
        list: currentFocusedFilesList.filter((file) => {
          return file !== action.filePath
        })
      });
    case SET_FOCUSED_FILE:
      return Object.assign({}, state, {
        list: [
          action.filePath
        ]
      });
    case SET_FOCUSED_FILES_LIST:
      return Object.assign({}, state, {
        list: [
          ...action.filePathList
        ]
      });
    default:
      return state;
  }
}