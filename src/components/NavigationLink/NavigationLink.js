import React, {Component} from "react";
import {Route, Link} from "react-router-dom";

import PropTypes from 'prop-types';

export default class NavigationLink extends Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired,
  }

  render() {
    return(
        <Route
            path={this.props.to}
            exact={this.props.activeOnlyWhenExact}
            children={({ match }) => (
                <li className={match ? "active" : ""}>
                  <Link to={this.props.to}>
                    {this.props.children}
                  </Link>
                </li>
            )}
        />
    );
  }
}
