import agaveFileSystems from './agaveFileSystems/sagas';
import files from './files/sagas';
import transferFiles from './transferFiles/sagas';
import userProfile from './userProfile/sagas';

const sagas = [
  agaveFileSystems,
  files,
  transferFiles,
  userProfile
];

export const initSagas = (sagaMiddleware) =>
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));