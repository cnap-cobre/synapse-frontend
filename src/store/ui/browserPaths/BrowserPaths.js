import {SET_BROWSER_PATH} from "./types";

export function setBrowserPath(system, path) {
  return {
    type: SET_BROWSER_PATH,
    system,
    path
  };
}