import {
  all, call, put, takeLatest, select,
} from 'redux-saga/effects';
import * as Synapse from '../../services/Synapse';
import * as types from './types';
import { actions } from './UserProfile';
import { push } from 'redux-json-router';

function* getUserProfile() {
  try {
    const userProfile = yield call(Synapse.fetchUserProfile);
    yield put(actions.success(userProfile));
  } catch (e) {
    console.log(e);
    yield put(actions.error(e));
    const currentURL = yield select(store => store.router.pathname);
    yield put(push(`/account/login?next=${currentURL}`));
  }
}

export default function* () {
  yield all([
    takeLatest(types.GET_USER_PROFILE_ASYNC.PENDING, getUserProfile),
  ]);
}
