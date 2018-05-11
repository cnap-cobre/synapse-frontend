import React, { Component } from 'react';
import SecondaryNavigation from 'Components/SecondaryNavigation';
import SearchBox from 'Components/SearchBox';
import NavbarButton from "Components/NavbarButton/NavbarButton";

export default class DefaultNavbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-minimize">
              <button id="minimizeSidebar" className="btn btn-fill btn-icon"><i className="ti-more-alt"></i></button>
            </div>
            <div className="navbar-header">
              <NavbarButton/>
              <a className="navbar-brand">CNAP</a>
            </div>
            <div className="collapse navbar-collapse">
              <SearchBox/>
              <SecondaryNavigation/>
            </div>
          </div>
        </nav>
    );
  }
}