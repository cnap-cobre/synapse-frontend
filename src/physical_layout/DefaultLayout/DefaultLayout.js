import React, { Component } from 'react';

import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultFooter from './DefaultFooter/DefaultFooter';

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
