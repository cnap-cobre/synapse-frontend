import {
  SHOW_DOTFILES,
  HIDE_DOTFILES,
  TOGGLE_DOTFILES,
  SET_SIDEBAR_MAXIMIZED,
  SET_SIDEBAR_MINIMIZED,
  TOGGLE_SIDEBAR,
  SET_MOBILE_NAV_OPEN,
  SET_MOBILE_NAV_CLOSED,
  TOGGLE_MOBILE_NAV,
  SET_FILE_VIEW_FORMAT_LIST,
  SET_FILE_VIEW_FORMAT_GRID,
  TOGGLE_FILE_VIEW_FORMAT
} from './visualOptions/types';

export function showDotifles() {
  return {
    type: SHOW_DOTFILES
  };
}

export function hideDotfiles() {
  return {
    type: HIDE_DOTFILES
  };
}

export function toggleDotfiles() {
  return {
    type: TOGGLE_DOTFILES
  };
}

// ----------------------------------------------

export function setSidebarMaximized() {
  return {
    type: SET_SIDEBAR_MAXIMIZED
  };
}

export function setSidebarMinimized() {
  return {
    type: SET_SIDEBAR_MINIMIZED
  };
}

export function toggleSidebar() {
  return {
    type: TOGGLE_SIDEBAR
  };
}

// --------------------------------------------

export function setMobileNavOpen() {
  return {
    type: SET_MOBILE_NAV_OPEN
  };
}

export function setMobileNavClose() {
  return {
    type: SET_MOBILE_NAV_CLOSED
  };
}

export function toggleMobileNav() {
  return {
    type: TOGGLE_MOBILE_NAV
  };
}

// --------------------------------------------

export function setFileViewFormatList() {
  return {
    type: SET_FILE_VIEW_FORMAT_LIST
  };
}

export function setFileViewFormatGrid() {
  return {
    type: SET_FILE_VIEW_FORMAT_GRID
  };
}

export function toggleFileViewFormat() {
  return {
    type: TOGGLE_FILE_VIEW_FORMAT
  };
}