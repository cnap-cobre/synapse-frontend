import React, {Component} from "react";
import {statusCodeToErrorMessage} from "../../../../util/ErrorMessage";

import PropTypes from 'prop-types';

export default class HttpErrorMessage extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    errorObject: PropTypes.object.isRequired
  };

  render() {
    if (!this.props.visible) {
      return null;
    }

    const message = statusCodeToErrorMessage(this.props.errorObject);

    return (
        <div
            className="alert alert-warning"
            style={{display: this.props.visible ? 'block' : 'none'}}
        >
          <p><b>Error:</b></p>
          <pre><code>
            {message}
          </code></pre>
        </div>
    );
  }
}