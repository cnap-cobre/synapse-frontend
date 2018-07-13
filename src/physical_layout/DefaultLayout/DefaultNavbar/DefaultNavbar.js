import MinimizeSidebarButton from "../../../components/MinimizeSidebarButton/MinimizeSidebarButton";
import NavbarButton from "../../../components/NavbarButton/NavbarButton";
import React from 'react';
import SearchBox from '../../../components/SearchBox/SearchBox';
import SecondaryNavigation from '../../../components/SecondaryNavigation/SecondaryNavigation';


export default class DefaultNavbar extends React.Component {
  render() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-minimize">
              <MinimizeSidebarButton />
            </div>
            <div className="navbar-header">
              <NavbarButton/>
              <a className="navbar-brand">CNAP</a>
            </div>
            <div className="collapse navbar-collapse">
              {/*<SearchBox/>*/}
              {/*<SecondaryNavigation/>*/}
            </div>
          </div>
        </nav>
    );
  }
}