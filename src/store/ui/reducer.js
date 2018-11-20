import { combineReducers } from 'redux'

import browserPaths from './browserPaths/reducer'
import focusedFiles from './focusedFiles/reducer'
import modals from './modals/reducer'
import visualOptions from './visualOptions/reducer'

export default combineReducers({
  browserPaths,
  focusedFiles,
  modals,
  visualOptions
})


export const getBrowserPaths = state => state.ui.browserPaths;

export const getFocusedFilePaths = state => state.ui.focusedFiles.list;

export const getFileViewFormat = state => state.ui.visualOptions.fileViewFormat;
export const getSidebarMinimized = state => state.ui.visualOptions.sidebarMinimized;
export const getShowDotfiles = state => state.ui.visualOptions.showDotfiles;
export const getMobileNavOpen = state => state.ui.visualOptions.mobileNavOpen;