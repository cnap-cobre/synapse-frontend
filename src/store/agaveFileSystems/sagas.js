import * as types from './types';
import { actions } from '../AgaveFileSystems';
import Agave from '../../services/Agave/index';
import { all, call, put, takeLatest } from 'redux-saga/effects';


function* getAgaveFileSystems() {
    try{
        const agaveFileSystems = yield call(Agave.listFileSystems);
        yield put(actions.success(agaveFileSystems));
    } catch (e) {
        console.log(e);
        yield put(actions.error(e));
    }
}

export default function* () {
    yield all([
        takeLatest(types.GET_AGAVE_FILE_SYSTEMS_ASYNC.PENDING, getAgaveFileSystems)
    ])
}