import React, { Component } from 'react';
import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

const UserProfileDefaults = {
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
    id: 0,
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    groups: [],
  }
};


export const UserProfileContext = React.createContext({
  // Default values - Used if component is outside of a provider
  // Otherwise, this is generally replaced right away.
  ...UserProfileDefaults
});

export class UserProfileProvider extends Component {
  state = {
    profile: UserProfileDefaults
  };

  componentWillMount() {
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    const url = '/api/v1/profiles/me/?format=json';
    fetch(url, {
      credentials: "same-origin",
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(fetchErrorThrower)
        .then(fetchToJson)
        .then((profile) => {
          this.setState({
            profile: profile
          })
        })
  }

  render() {
    return (
        <UserProfileContext.Provider value={{profile: this.state.profile}}>
          {this.props.children}
        </UserProfileContext.Provider>
    );
  }
}