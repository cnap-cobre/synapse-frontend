import {
  HIDE_DOTFILES,
  SET_FILE_VIEW_FORMAT_GRID,
  SET_FILE_VIEW_FORMAT_LIST,
  SET_MOBILE_NAV_CLOSED,
  SET_MOBILE_NAV_OPEN,
  SET_SIDEBAR_MAXIMIZED,
  SET_SIDEBAR_MINIMIZED,
  SHOW_DOTFILES,
  TOGGLE_DOTFILES, TOGGLE_FILE_VIEW_FORMAT, TOGGLE_MOBILE_NAV, TOGGLE_SIDEBAR
} from "./types";


export const initialVisualOptionsState = {
  showDotfiles: false,
  sidebarMinimized: false,
  mobileNavOpen: false,
  fileViewFormat: false,
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
    // ----------
    // Mobile Nav
    // ----------
    case SET_MOBILE_NAV_OPEN:
      return Object.assign({}, state, {
        mobileNavOpen: true
      });
    case SET_MOBILE_NAV_CLOSED:
      return Object.assign({}, state, {
        mobileNavOpen: false
      });
    case TOGGLE_MOBILE_NAV:
      return Object.assign({}, state, {
        mobileNavOpen: !state.mobileNavOpen
      });
    // -----------------------------
    // File View - List or Grid view
    // -----------------------------
    case SET_FILE_VIEW_FORMAT_LIST:
      return Object.assign({}, state, {
        fileViewFormat: false
      });
    case SET_FILE_VIEW_FORMAT_GRID:
      return Object.assign({}, state, {
        fileViewFormat: true
      });
    case TOGGLE_FILE_VIEW_FORMAT:
      return Object.assign({}, state, {
        fileViewFormat: !state.fileViewFormat
      });
    // -----------------------------
    default:
      return state;
  }
}