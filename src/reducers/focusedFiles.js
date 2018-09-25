import {ADD_FOCUSED_FILE, REMOVE_FOCUSED_FILE, SET_FOCUSED_FILE} from "../actions/focusedFiles";

const initialFocusedFileState = {
  list: []
};

export default function focusedFile(state = initialFocusedFileState, action) {
  const currentFocusedFilesList = state.list;
  console.log('Current list', currentFocusedFilesList);
  switch (action.type) {
    case ADD_FOCUSED_FILE:
      return Object.assign({}, state, {
        list: [...currentFocusedFilesList, {
          filePath: action.filePath
        }]
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
          {filePath: action.filePath}
        ]
      });
    default:
      return state;
  }
}