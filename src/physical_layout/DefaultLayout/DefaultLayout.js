// @flow

import { connect } from 'react-redux';
import * as React from 'react';
import DefaultNavbar from './DefaultNavbar/DefaultNavbar';
import DefaultSidebar from './DefaultSidebar/DefaultSidebar';
import { toggleMobileNav } from '../../store/ui/visualOptions/VisualOptions';
import { getMobileNavOpen, getSidebarMinimized } from '../../store/ui/reducer';

type Props = {
  children: React.Node,
  onClick(): typeof undefined,
  mobileNavOpen: boolean,
  sidebarMinimized: boolean,
}

const DefaultLayout = (props: Props) => {
  const {
    sidebarMinimized, mobileNavOpen, onClick, children,
  } = props;

  return (
    <div className={
        (sidebarMinimized ? 'sidebar-mini' : '')
        + (mobileNavOpen ? 'nav-open' : '')
      }
    >
      <div className="wrapper">
        <DefaultSidebar />

        <div className="main-panel">
          <DefaultNavbar />

          {children}

          <div
            className={`close-layer${
              mobileNavOpen ? ' visible' : ''}`}
            onClick={onClick}
          />
        </div>
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
)(DefaultLayout);
