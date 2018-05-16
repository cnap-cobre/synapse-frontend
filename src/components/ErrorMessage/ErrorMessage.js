import React, {Component} from "react";

import PropTypes from 'prop-types';

export default class ErrorMessage extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    message: PropTypes.string.isRequired
  };

  render() {
    return (
        <div
            className="alert alert-warning"
            style={{display: this.props.visible ? 'block' : 'none'}}
        >
          <p><b>Service Unavailable - </b>The Agave API appears to be experienceing a service disruption.  Please try again later.</p>
          <p>Check <a href="http://status.agaveapi.co/">status.agaveapi.co</a> for the status of the Agave API services.</p>
          <pre><code>{this.props.message}</code></pre>
        </div>
    );
  }
}