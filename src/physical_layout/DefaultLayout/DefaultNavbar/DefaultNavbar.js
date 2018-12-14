import React from 'react';
import MinimizeSidebarButton from '../../../components/MinimizeSidebarButton/MinimizeSidebarButton';
import NavbarButton from '../../../components/NavbarButton/NavbarButton';
// import SearchBox from '../../../components/SearchBox/SearchBox';
// import SecondaryNavigation from '../../../components/SecondaryNavigation/SecondaryNavigation';


const DefaultNavbar = () => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-minimize">
        <MinimizeSidebarButton />
      </div>
      <div className="navbar-header">
        <NavbarButton />
        <span className="navbar-brand">CNAP</span>
      </div>
      <div className="collapse navbar-collapse">
        {/* <SearchBox/> */}
        {/* <SecondaryNavigation/> */}
      </div>
    </div>
  </nav>
);

export default DefaultNavbar;
