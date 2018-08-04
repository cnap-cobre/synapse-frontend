export const SHOW_DOTFILES = 'SHOW_DOTFILES';
export const HIDE_DOTFILES = 'HIDE_DOTFILES';
export const TOGGLE_DOTFILES = 'TOGGLE_DOTFILES';

export function show_dotifles() {
  return {
    type: SHOW_DOTFILES
  };
}

export function hide_dotfiles() {
  return {
    type: HIDE_DOTFILES
  };
}

export function toggle_dotfiles() {
  return {
    type: TOGGLE_DOTFILES
  };
}

// ----------------------------------------------

export const SET_SIDEBAR_MAXIMIZED = 'SET_SIDEBAR_MAXIMIZED';
export const SET_SIDEBAR_MINIMIZED = 'SET_SIDEBAR_MINIMIZED';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

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

export const SET_MOBILE_NAV_OPEN = 'SET_MOBILE_NAV_OPEN';
export const SET_MOBILE_NAV_CLOSED = 'SET_MOBILE_NAV_CLOSED';
export const TOGGLE_MOBILE_NAV = 'TOGGLE_MOBILE_NAV';

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

export const SET_FILE_VIEW_FORMAT_LIST = 'SET_FILE_VIEW_FORMAT_LIST';
export const SET_FILE_VIEW_FORMAT_GRID = 'SET_FILE_VIEW_FORMAT_GRID';
export const TOGGLE_FILE_VIEW_FORMAT = 'TOGGLE_FILE_VIEW_FORMAT';

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