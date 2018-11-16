import * as agaveFileSystemsTypes from '../agaveFileSystems/types';
import * as userProfileTypes from '../userProfile/types';
import {SET_BROWSER_PATH} from "./types";

export const initialBrowserPathsState = {};


export default function browserPaths(state = initialBrowserPathsState, action) {
  switch (action.type) {
    case agaveFileSystemsTypes.GET_AGAVE_FILE_SYSTEMS_ASYNC.SUCCESS:
      const keysFromAction = action.systems.reduce((acc, cv) => {
        acc[cv.provider + '.' + cv.id] = ['', cv.provider, cv.id, ''].join('/');
        return acc;
      }, {});

      return {
        ...keysFromAction,
        ...state
      };
    case userProfileTypes.GET_USER_PROFILE_ASYNC.SUCCESS:
      const dropboxBrowserPaths = Object.keys(state).filter(
        (k) => k.indexOf('dropbox') === 1
      ).reduce((acc, cv) => {
        return {
          ...acc,
          [cv]: state[cv]
        }
      }, {});

      const nonDropboxBrowserPaths = Object.keys(state).filter(
        (k) => k.indexOf('dropbox') !== 1
      ).reduce((acc, cv) => {
        return {
          ...acc,
          [cv]: state[cv]
        }
      }, {});

      if (action.userProfile.dropbox.length !== 0) {
        return {
          ...nonDropboxBrowserPaths,
          'dropbox.home': '/dropbox/home/',
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
