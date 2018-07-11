import {INVALIDATE_PROFILE, RECEIVE_PROFILE, REQUEST_PROFILE} from "../actions/userProfile";

export const initialUserProfileState = {
  id: 0,
  institution: '',
  gravatar: {
    url: '',
    exists: false,
    profile: '',
    hash: ''
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
  isFetching: false,
  didInvalidate: false,
  lastUpdated: 0,
  hasFetched: false
};

export default function userProfile(state = initialUserProfileState, action) {
  switch (action.type) {
    case INVALIDATE_PROFILE:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_PROFILE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case RECEIVE_PROFILE:
      return Object.assign({}, state, {
        ...action.userProfile,
        isFetching: false,
        didInvalidate: false,
        lastUpdated: action.receivedAt,
        hasFetched: true
      });
    default:
      return state;
  }
}