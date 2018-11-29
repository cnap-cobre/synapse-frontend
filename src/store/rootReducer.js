import notifications from 'react-redux-notify';
import agaveFileSystems from './agaveFileSystems/reducer';
import browserPaths from './ui/browserPaths/reducer';
import csrf from './csrf/reducer';
import fileHistory from './fileHistory/reducer';
import files from './files/reducer';
import filesFlat from './filesFlat/reducer';
import fileSystems from './fileSystems/reducer';
import focusedFiles from './ui/focusedFiles/reducer';
import modals from './ui/modals/reducer';
import transferFiles from './transferFiles/reducer';
import userProfile from './userProfile/reducer';
import ui from './ui/reducer';


export default {
  agaveFileSystems,
  browserPaths,
  csrf,
  fileHistory,
  files,
  filesFlat,
  fileSystems,
  focusedFiles,
  modals,
  notifications,
  transferFiles,
  userProfile,
  ui,
};
