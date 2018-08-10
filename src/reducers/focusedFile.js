import {SET_FOCUSED_FILE} from "../actions/focusedFile";

const initialFocusedFileState = {};

export default function focusedFile(state = initialFocusedFileState, action) {
  switch (action.type) {
    case SET_FOCUSED_FILE:
      return Object.assign({}, state, {
        filePath: action.filePath
      });
    default:
      return state;
  }
}