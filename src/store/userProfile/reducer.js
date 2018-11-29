import * as types from './types';

export const initialUserProfileState = {
  id: 0,
  institution: '',
  gravatar: {
    url: '',
    exists: false,
    profile: '',
    hash: '',
  },
  dropbox: [],
  agave: [],
  globus: [],
  user: {
    id: -1,
    first_name: '',
    last_name: '',
    full_name: '',
    username: '',
    email: '',
    groups: [],
  },
  loading: false,
};

export default function userProfile(state = initialUserProfileState, action) {
  switch (action.type) {
    case types.GET_USER_PROFILE_ASYNC.PENDING:
      return Object.assign({}, state, {
        loading: true,
      });
    case types.GET_USER_PROFILE_ASYNC.SUCCESS:
      return Object.assign({}, state, {
        ...action.userProfile,
        loading: false,
      });
    default:
      return state;
  }
}
