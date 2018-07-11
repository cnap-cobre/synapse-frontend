import {Collapse} from 'react-bootstrap';
import PropTypes from 'prop-types';
import React from "react";


/*
 Note:

 The data-toggle="collapse" does nothing.  The CSS for our
 template was written expecting it to be there.  The old jQuery
 implementation of Bootstrap's Collapse feature used it, but
 this React implementation does not.
*/

export default class NavigationGroup extends React.Component {
  static propTypes = {
    to: PropTypes.string.isRequired,
    activeOnlyWhenExact: PropTypes.bool.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  };

  state = {
    open: false
  };

  render() {
    const match = false;
    return (
        <li className={match ? "active" : ""}>
          <a onClick={() => this.setState({ open: !this.state.open })} data-toggle="collapse">
            <i className={this.props.icon}/>
            <p>{this.props.label}
              <b className="caret"/>
            </p>
          </a>
          <Collapse in={this.state.open}>
            <div>
              <ul className="nav">
                {this.props.children}
              </ul>
            </div>
          </Collapse>
        </li>
    );
  }
}

// <Route
//           path={this.props.to}
//           exact={this.props.activeOnlyWhenExact}
//           children={({ match }) => (
//
//           )}
// />