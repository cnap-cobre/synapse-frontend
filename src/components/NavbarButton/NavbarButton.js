import {connect} from 'react-redux';
import React from 'react';
import {toggleMobileNav} from "../../actions/visualOptions";

class NavbarButton extends React.Component {
  render() {
    return (
        <button type="button"
                className={"navbar-toggle " + (
                    this.props.mobileNavOpen ? "toggled" : ""
                )}
                onClick={this.props.toggleMobileNav}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar bar1"></span>
          <span className="icon-bar bar2"></span>
          <span className="icon-bar bar3"></span>
        </button>
    );
  }
}

const mapStateToProps = (store) => ({
  mobileNavOpen: store.visualOptions.mobileNavOpen
});

const mapDispatchToProps = (dispatch) => ({
  toggleMobileNav: () => {dispatch(toggleMobileNav())}
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavbarButton);