import Button from 'react-bootstrap/lib/Button';
import FaRefresh from 'react-icons/lib/fa/refresh';
import PropTypes from 'prop-types';
import React, { Component } from 'react';


export default class BrowserRefresh extends Component {
  static propTypes = {
    handleRefresh: PropTypes.func.isRequired,
  };

  render() {
    return (

      <Button
        id="RefreshButton"
        bsSize="xsmall"
        onClick={this.props.handleRefresh}
        style={{
          height: '2.7em',
          marginTop: '0.5em',
        }}
      >
        <FaRefresh />
&nbsp;Refresh
      </Button>

    );
  }
}
