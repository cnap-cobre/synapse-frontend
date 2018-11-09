import agaveFileSystems from './agaveFileSystems/sagas';
import files from './files/sagas';
import transferFiles from './transferFiles/sagas';

const sagas = [
  agaveFileSystems,
  files,
  transferFiles
];

export const initSagas = (sagaMiddleware) =>
    sagas.forEach(sagaMiddleware.run.bind(sagaMiddleware));