// @flow

import { connect } from 'react-redux';
import React from 'react';
import { toggleMobileNav } from '../../store/ui/visualOptions/VisualOptions';
import { getMobileNavOpen } from '../../store/ui/reducer';

type Props = {
  toggleMobileNav(): typeof undefined,
  mobileNavOpen: boolean,
}

const NavbarButton = (props: Props) => {
  const { toggleMobileNav, mobileNavOpen } = props;
  return (
    <button
      type="button"
      className={`navbar-toggle ${
        mobileNavOpen ? 'toggled' : ''}`}
      onClick={toggleMobileNav}
    >
      <span className="sr-only">Toggle navigation</span>
      <span className="icon-bar bar1" />
      <span className="icon-bar bar2" />
      <span className="icon-bar bar3" />
    </button>
  );
};

const mapStateToProps = store => ({
  mobileNavOpen: getMobileNavOpen(store),
});

const mapDispatchToProps = {
  toggleMobileNav,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarButton);
