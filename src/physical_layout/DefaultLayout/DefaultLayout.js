import { connect } from 'react-redux';
import React from 'react';
import DefaultFooter from './DefaultFooter/DefaultFooter';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import { toggleMobileNav } from '../../store/ui/visualOptions/VisualOptions';
import { getMobileNavOpen, getSidebarMinimized } from '../../store/ui/reducer';

class DefaultLayout extends React.Component {
  render() {
    return (
      <div className={
        (this.props.sidebarMinimized ? 'sidebar-mini' : '')
        + (this.props.mobileNavOpen ? 'nav-open' : '')
      }
      >
        <div className="wrapper">
          <DefaultSidebar />

          <div className="main-panel">
            <DefaultNavbar />

            {this.props.children}

            <div
              className={`close-layer${
                this.props.mobileNavOpen ? ' visible' : ''}`}
              onClick={this.props.toggleMobileNav}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  sidebarMinimized: getSidebarMinimized(store),
  mobileNavOpen: getMobileNavOpen(store),
});

const mapDispatchToProps = dispatch => ({
  toggleMobileNav: () => { dispatch(toggleMobileNav()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultLayout);
