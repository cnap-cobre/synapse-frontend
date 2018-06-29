import React, {Component} from 'react';
import Logo from 'Components/Logo/Logo';
import UserDropdown from 'Components/UserDropdown/UserDropdown';
import Navigation from 'Components/Navigation/Navigation';

import { UserProfileContext } from "../../../contexts/UserProfileContext";

export default class DefaultSidebar extends Component {
  render() {
    return (
        <div className="sidebar"
             data-background-color="white"
             data-active-color="danger">
          <Logo/>
          <div className="sidebar-wrapper">
            <UserProfileContext.Consumer>
              {state => (<UserDropdown userProfile={state.profile} />)}
            </UserProfileContext.Consumer>
            <Navigation/>
          </div>
        </div>
    );
  }
}