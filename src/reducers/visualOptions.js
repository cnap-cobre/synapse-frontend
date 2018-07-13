import {
  HIDE_DOTFILES,
  SET_SIDEBAR_MAXIMIZED,
  SET_SIDEBAR_MINIMIZED,
  SHOW_DOTFILES,
  TOGGLE_DOTFILES, TOGGLE_SIDEBAR
} from "../actions/visualOptions";


export const initialVisualOptionsState = {
  showDotfiles: false,
  sidebarMinimized: false
};

export default function visualOptions(state = initialVisualOptionsState, action) {
  switch (action.type) {
    // ---------
    // Dotfiles
    // ---------
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
    // ---------
    // Sidebar
    // ---------
    case SET_SIDEBAR_MAXIMIZED:
      return Object.assign({}, state, {
        sidebarMinimized: false
      });
    case SET_SIDEBAR_MINIMIZED:
      return Object.assign({}, state, {
        sidebarMinimized: true
      });
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        sidebarMinimized: !state.sidebarMinimized
      });
    default:
      return state;
  }
}