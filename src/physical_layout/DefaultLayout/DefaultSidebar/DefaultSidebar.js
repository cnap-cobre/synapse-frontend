import Logo from '../../../components/Logo/Logo';
import Navigation from '../../../components/Navigation/Navigation';
import React from 'react';
import UserDropdown from '../../../components/UserDropdown/UserDropdown';

export default class DefaultSidebar extends React.Component {
  render() {
    return (
        <div className="sidebar"
             data-background-color="white"
             data-active-color="danger">
          <Logo/>
          <div className="sidebar-wrapper">

            <UserDropdown/>

            <Navigation/>
          </div>
        </div>
    );
  }
}