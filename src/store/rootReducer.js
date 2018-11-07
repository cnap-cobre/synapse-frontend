import agaveFileSystems from './agaveFileSystems/reducer';
import browserPaths from './browserPaths/reducer';
import csrf from './csrf/reducer';
import files from './files/reducer';
import filesFlat from './filesFlat/reducer';
import fileSystems from './fileSystems/reducer';
import focusedFiles from './focusedFiles/reducer';
import modals from './modals/reducer';
import notifications from 'react-redux-notify';
import transferFiles from './transferFiles/reducer';
import userProfile from './userProfile/reducer';
import visualOptions from './visualOptions/reducer';


export default {
  agaveFileSystems,
  browserPaths,
  csrf,
  files,
  filesFlat,
  fileSystems,
  focusedFiles,
  modals,
  notifications,
  transferFiles,
  userProfile,
  visualOptions
};