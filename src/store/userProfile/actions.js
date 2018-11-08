import {
  REQUEST_PROFILE,
  INVALIDATE_PROFILE,
  RECEIVE_PROFILE
} from "./types";

export function requestProfile() {
  return {
    type: REQUEST_PROFILE
  }
}

export function receiveProfile(json) {
  return {
    type: RECEIVE_PROFILE,
    userProfile: json,
    receivedAt: Date.now()
  }
}

export function invalidateProfile() {
  return {
    type: INVALIDATE_PROFILE,
  }
}

function fetchProfile() {
  const action = dispatch => {
    dispatch(requestProfile());
    return fetch(`/api/v1/profiles/me/`, {
      credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(json => dispatch(receiveProfile(json)));
  };
  action.type = 'FETCH_PROFILE';
  return action;
}

function shouldFetchProfile(state) {
  const userProfile = state.userProfile;

  if (userProfile.id !== userProfile.user.id) {
    return true;
  } else if (userProfile.isFetching) {
    return false;
  } else {
    return userProfile.didInvalidate;
  }
}

export function fetchProfileIfNeeded() {
  const action = (dispatch, getState) => {
    if (shouldFetchProfile(getState())) {
      return dispatch(fetchProfile());
    }
  };
  action.type = 'FETCH_PROFILE_IF_NEEDED';
  return action;
}