import * as Synapse from '../../../services/Synapse';
import * as types from './types';
import { actions } from '../../actions/UserProfile';
import { all, call, put, takeLatest } from 'redux-saga/effects';


function* getUserProfile() {
  try{
    const userProfile = yield call(Synapse.fetchUserProfile);
    yield put(actions.success(userProfile));
  } catch (e) {
    console.log(e);
    yield put(actions.error(e));
  }
}

export default function* () {
  yield all([
     takeLatest(types.GET_USER_PROFILE_ASYNC.PENDING, getUserProfile)
  ]);
}