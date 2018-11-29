import Cookies from 'js-cookie';
import { PUT_CSRF_TOKEN_IN_STORE } from './types';

export const initialCSRFTokenState = {
  token: '',
  hasReadCookie: false,
};

export default function csrf(state = initialCSRFTokenState, action) {
  switch (action.type) {
    case PUT_CSRF_TOKEN_IN_STORE:
      return Object.assign({}, state, {
        token: Cookies.get('csrftoken'),
        hasReadCookie: true,
      });
    default:
      return state;
  }
}
