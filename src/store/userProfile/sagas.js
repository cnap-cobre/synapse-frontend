import {
  all, call, put, takeLatest, select,
} from 'redux-saga/effects';
import { push } from 'redux-json-router';
import * as Synapse from '../../services/Synapse';
import * as types from './types';
import { actions } from './UserProfile';

function* getUserProfile() {
  try {
    const userProfile = yield call(Synapse.fetchUserProfile);
    yield put(actions.success(userProfile));
  } catch (e) {
    yield put(actions.error(e));
    const currentURL = yield select(store => store.router.pathname);
    if (
      currentURL === '/account/register'
        || currentURL === '/account/login'
        || currentURL === '/about'
    ) {
      // Chill out
    } else {
      yield put(push(`/account/login?next=${currentURL}`));
    }
  }
}

export default function* () {
  yield all([
    takeLatest(types.GET_USER_PROFILE_ASYNC.PENDING, getUserProfile),
  ]);
}
