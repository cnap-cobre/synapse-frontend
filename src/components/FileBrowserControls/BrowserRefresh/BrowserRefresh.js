// @flow

import Button from 'react-bootstrap/lib/Button';
import FaRefresh from 'react-icons/lib/fa/refresh';
import React, { Component } from 'react';

type Props = {
  handleRefresh(): typeof undefined,
}

const BrowserRefresh = (props: Props) => {
  const { handleRefresh } = props;

  return (

    <Button
      id="RefreshButton"
      bsSize="xsmall"
      onClick={handleRefresh}
      style={{
        height: '2.7em',
        marginTop: '0.5em',
      }}
    >
      <FaRefresh />
        &nbsp;Refresh
    </Button>

  );
};

export default BrowserRefresh;
