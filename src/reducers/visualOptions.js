import {HIDE_DOTFILES, SHOW_DOTFILES, TOGGLE_DOTFILES} from "../actions/visualOptions";


export const initialVisualOptionsState = {
  showDotfiles: false
};

export default function visualOptions(state = initialVisualOptionsState, action) {
  switch (action.type) {
    case SHOW_DOTFILES:
      return Object.assign({}, state, {
        showDotfiles: true
      });
    case HIDE_DOTFILES:
      return Object.assign({}, state, {
        showDotfiles: false
      });
    case TOGGLE_DOTFILES:
      return Object.assign({}, state, {
        showDotfiles: !state.showDotfiles
      });
    default:
      return state;
  }
}