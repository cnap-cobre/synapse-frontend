import {connect} from 'react-redux';
import {Link} from 'redux-json-router';
import PropTypes from 'prop-types';
import React from "react";

class NavigationLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    let match;
    if (this.props.activeOnlyWhenExact) {
      match = this.props.to === this.props.pathname;
    } else {
      match = this.props.pathname.indexOf(this.props.to) === 0;
    }
    return(
        <li className={match ? "active" : ""}>
          <Link to={this.props.to}>
            {this.props.children}
          </Link>
        </li>
    );
  }
}

const mapStateToProps = (store) => ({ pathname: store.router.pathname });

export default connect(
    mapStateToProps
)(NavigationLink);