import React, { Component } from 'react';
import {fetchErrorThrower, fetchToJson} from "../util/FetchUtils";

export const UserProfileDefaults = {
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
    full_name: '',
    username: '',
    email: '',
    groups: [],
  }
};

export const UserProfileContext = React.createContext({
  // Default values - Used if component is outside of a provider
  // Otherwise, this is generally replaced right away.
  profile: {
    ...UserProfileDefaults
  },
  agaveSystems: []
});

export class UserProfileProvider extends Component {
  constructor(){
    super();
    this.state = {
      profile: UserProfileDefaults,
      agaveSystems: []
    }
  }

  componentWillMount() {
    this.fetchUserProfile();
    this.fetchAgaveSystems();
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

  fetchAgaveSystems() {
    const url = '/agave/systems/v2/'
    fetch(url, {
      credentials: "same-origin",
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }).then(fetchErrorThrower)
        .then(fetchToJson)
        .then((agave) => {
          this.setState({
            agaveSystems: agave.result
          });
          console.log(agave);
        })
  }

  render() {
    return (
        <UserProfileContext.Provider value={this.state}>
          {this.props.children}
        </UserProfileContext.Provider>
    );
  }
}