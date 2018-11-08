import {connect} from 'react-redux';
import DefaultFooter from './DefaultFooter/DefaultFooter';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import React from 'react';
import {toggleMobileNav} from "../../store/VisualOptions";

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className={
        (this.props.sidebarMinimized ? "sidebar-mini" : "") +
        (this.props.mobileNavOpen ? "nav-open" : "")
      }>
        <div className="wrapper">
          <DefaultSidebar/>

          <div className="main-panel">
            <DefaultNavbar/>

            {this.props.children}

            <div className={"close-layer" + (
                   this.props.mobileNavOpen ? " visible" : ""
                 )}
                 onClick={this.props.toggleMobileNav}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  sidebarMinimized: store.visualOptions.sidebarMinimized,
  mobileNavOpen: store.visualOptions.mobileNavOpen
});

const mapDispatchToProps = (dispatch) => ({
  toggleMobileNav: () => {dispatch(toggleMobileNav())}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultLayout);