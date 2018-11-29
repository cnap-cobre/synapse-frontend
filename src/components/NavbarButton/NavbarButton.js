import { connect } from 'react-redux';
import React from 'react';
import { toggleMobileNav } from '../../store/ui/visualOptions/VisualOptions';
import { getMobileNavOpen } from '../../store/ui/reducer';

class NavbarButton extends React.Component {
  render() {
    return (
      <button
        type="button"
        className={`navbar-toggle ${
          this.props.mobileNavOpen ? 'toggled' : ''}`}
        onClick={this.props.toggleMobileNav}
      >
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar bar1" />
        <span className="icon-bar bar2" />
        <span className="icon-bar bar3" />
      </button>
    );
  }
}

const mapStateToProps = store => ({
  mobileNavOpen: getMobileNavOpen(store),
});

const mapDispatchToProps = dispatch => ({
  toggleMobileNav: () => { dispatch(toggleMobileNav()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavbarButton);
