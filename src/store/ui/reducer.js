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