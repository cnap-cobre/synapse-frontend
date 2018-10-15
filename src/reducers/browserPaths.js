import {RECEIVE_AGAVE_FILE_SYSTEMS} from "../actions/agaveFileSystems";
import {RECEIVE_PROFILE} from "../actions/userProfile";
import {SET_BROWSER_PATH} from "../actions/browserPaths";

export const initialBrowserPathsState = {};


export default function browserPaths(state = initialBrowserPathsState, action) {
  switch (action.type) {
    case RECEIVE_AGAVE_FILE_SYSTEMS:
      const keysFromAction = action.systems.reduce((acc, cv) => {
        acc[cv.provider + '.' + cv.id] = [cv.provider, cv.id, ''].join('/');
        return acc;
      }, {});

      return {
        ...keysFromAction,
        ...state
      };
    case RECEIVE_PROFILE:
      const dropboxBrowserPaths = Object.keys(state).filter(
        (k) => k.indexOf('dropbox') === 0
      ).reduce((acc, cv) => {
        return {
          ...acc,
          [cv]: state[cv]
        }
      }, {});

      const nonDropboxBrowserPaths = Object.keys(state).filter(
        (k) => k.indexOf('dropbox') !== 0
      ).reduce((acc, cv) => {
        return {
          ...acc,
          [cv]: state[cv]
        }
      }, {});

      if (action.userProfile.dropbox.length !== 0) {
        return {
          ...nonDropboxBrowserPaths,
          'dropbox.home': 'dropbox/home/',
          ...dropboxBrowserPaths
        };
      }
      return state;
    case SET_BROWSER_PATH:
      return {
        ...state,
        [action.system]: action.path
      };
    default:
      return state;
  }
}
