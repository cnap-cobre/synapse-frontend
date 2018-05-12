import React, {Component} from "react";
import {Route, Link} from "react-router-dom";

export default class NavigationLink extends Component {
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
