import {SET_BROWSER_PATH} from "../private/browserPaths/types";

export function setBrowserPath(system, path) {
  return {
    type: SET_BROWSER_PATH,
    system,
    path
  };
}