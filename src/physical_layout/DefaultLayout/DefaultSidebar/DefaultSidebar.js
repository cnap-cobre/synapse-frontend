import React from 'react';
import Logo from '../../../components/Logo/Logo';
import Navigation from '../../../components/Navigation/Navigation';
import UserDropdown from '../../../components/UserDropdown/UserDropdown';

const DefaultSidebar = () => (
  <div
    className="sidebar"
    data-background-color="white"
    data-active-color="danger"
  >
    <Logo />
    <div className="sidebar-wrapper">

      <UserDropdown />

      <Navigation />
    </div>
  </div>
);

export default DefaultSidebar;
