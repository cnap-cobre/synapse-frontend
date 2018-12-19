// @flow

import * as types from './types';
import type { userProfileStateType } from '../../types/userProfileTypes';

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
  jupyter: [],
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

type Action = { type: string, userProfile: userProfileStateType }

export default function userProfile(
  state: userProfileStateType = initialUserProfileState,
  action: Action,
) {
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

export const getExternalAccounts = (state: any) => {
  const profile = state.userProfile;
  return {
    dropbox: profile.dropbox && profile.dropbox.length > 0,
    agave: profile.agave && profile.agave.length > 0,
    globus: profile.globus && profile.globus.length > 0,
    jupyter: profile.jupyter && profile.jupyter.length > 0,
  };
};

export const getJupyterHubUsername = (state: any) => {
  const jupyterProfiles = state.userProfile.jupyter;

  if (!jupyterProfiles || jupyterProfiles.length === 0) {
    return null;
  }
  const jp = jupyterProfiles[0];
  return jp.extra_data.name;
};
