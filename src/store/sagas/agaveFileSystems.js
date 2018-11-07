import Agave from '../../services/Agave/index';
import {FETCH_AGAVE_FILE_SYSTEMS_IF_NEEDED, RECEIVE_AGAVE_FILE_SYSTEMS} from "../agaveFileSystems/actions";
import {select} from 'redux-saga/effects';

function* watchFetchAgaveFileSystemsIfNeeded() {
    yield takeEvery(FETCH_AGAVE_FILE_SYSTEMS_IF_NEEDED);
}

function* fetchAgaveFileSystems() {
    try {
        const agaveSystems = yield Agave.listFileSystems();
        dispatch({ type: RECEIVE_AGAVE_FILE_SYSTEMS, agaveSystems });
    } catch (error) {

    }
}