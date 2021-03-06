import agaveFileSystems from './agaveFileSystems/sagas';
import browserPaths from './ui/browserPaths/sagas';
import fileHistory from './fileHistory/sagas';
import files from './files/sagas';
import focusedFiles from './ui/focusedFiles/sagas';
import transferFiles from './transferFiles/sagas';
import userProfile from './userProfile/sagas';

const sagas = [
  agaveFileSystems,
  browserPaths,
  fileHistory,
  files,
  focusedFiles,
  transferFiles,
  userProfile,
];

export const initSagas = sagaMiddleware => sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));
