export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE';
export const INVALIDATE_PROFILE = 'INVALIDATE_PROFILE';

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
  return dispatch => {
    dispatch(requestProfile());
    return fetch(`/api/v1/profiles/me/`, {
      credentials: 'same-origin'
    })
        .then(response => response.json())
        .then(json => dispatch(receiveProfile(json)));
  }
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
  return (dispatch, getState) => {
    if (shouldFetchProfile(getState())) {
      return dispatch(fetchProfile());
    }
  }
}