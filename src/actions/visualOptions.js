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