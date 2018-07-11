import {Link} from 'redux-json-router';
import PropTypes from 'prop-types';
import React from "react";

export default class NavigationLink extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired,
  }

  render() {
    const match = false;
    return(
        <li className={match ? "active" : ""}>
          <Link to={this.props.to}>
            {this.props.children}
          </Link>
        </li>
    );
  }
}




// <Route
//             path={this.props.to}
//             exact={this.props.activeOnlyWhenExact}
//             children={({ match }) => (
//             )}
// />