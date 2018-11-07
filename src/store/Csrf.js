import {PUT_CSRF_TOKEN_IN_STORE} from "./csrf/types";

export function putCSRFTokenInStore() {
  return {
    type: PUT_CSRF_TOKEN_IN_STORE
  }
}