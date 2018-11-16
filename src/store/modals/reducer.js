import {ADD_MODAL, REMOVE_MODAL} from "./types";

export const initialModalState = {};

export default function modals(state = initialModalState, action) {
  switch (action.type) {
    case ADD_MODAL:
      return Object.assign({}, state, {
        [action.id]: action.config
      });
    case REMOVE_MODAL:
      const { [action.id]: value, ...remainingModals } = state;
      return Object.assign({}, remainingModals);
    default:
      return state;
  }
}