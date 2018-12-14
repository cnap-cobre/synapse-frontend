// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getMobileNavOpen, getSidebarMinimized } from '../../store/ui/reducer';
import { toggleMobileNav } from '../../store/ui/visualOptions/VisualOptions';

const WrapperFullPage = (props) => {
  const {
    children, sidebarMinimized, mobileNavOpen, onClick,
  } = props;

  return (
    <div className={
        (sidebarMinimized ? 'sidebar-mini' : '')
        + (mobileNavOpen ? 'nav-open' : '')
      }
    >
      <div className="wrapper wrapper-full-page">
        <div className="full-page login-page">
          <div className="content">
            {children}
          </div>
        </div>
        <div
          className={`close-layer${
            mobileNavOpen ? ' visible' : ''}`}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

const mapStateToProps = store => ({
  sidebarMinimized: getSidebarMinimized(store),
  mobileNavOpen: getMobileNavOpen(store),
});

const mapDispatchToProps = {
  onClick: toggleMobileNav,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WrapperFullPage);
