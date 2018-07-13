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