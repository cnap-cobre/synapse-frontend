import DefaultFooter from './DefaultFooter/DefaultFooter';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import React, { Component } from 'react';

export default class DefaultLayout extends Component {
  render() {
    return (
      <div className="wrapper">
        <DefaultSidebar/>

        <div className="main-panel">
          <DefaultNavbar/>

          {this.props.children}

          <DefaultFooter/>
        </div>
      </div>
    );
  }
}
