import {connect} from 'react-redux';
import DefaultFooter from './DefaultFooter/DefaultFooter';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import React from 'react';

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className={this.props.sidebarMinimized ? "sidebar-mini" : ""}>
        <div className="wrapper">
          <DefaultSidebar/>

          <div className="main-panel">
            <DefaultNavbar/>

            {this.props.children}

            <DefaultFooter/>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  sidebarMinimized: store.visualOptions.sidebarMinimized
});

export default connect(
  mapStateToProps
)(DefaultLayout);