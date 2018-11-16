import uuidv4 from 'uuid/v4';
import {ADD_MODAL, REMOVE_MODAL} from '../private/modals/types';

// For now, we'll declare these here.
// The kinds of modals that we want are
// confirm: confirm a yes/no action, bind something to 'yes'
// notify: get the user's attention, but do nothing when
//   the user clicks 'okay'
// input: get an input value from the user, then bind something
//   to 'submit' which does something with the input value

export function addModal(config) {
  return {
    type: ADD_MODAL,
    id: uuidv4(),
    config
  }
}

export function removeModal(id) {
  return {
    type: REMOVE_MODAL,
    id
  }
}