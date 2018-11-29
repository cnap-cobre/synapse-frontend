import { PUT_CSRF_TOKEN_IN_STORE } from './types';

export function putCSRFTokenInStore() {
  return {
    type: PUT_CSRF_TOKEN_IN_STORE,
  };
}
