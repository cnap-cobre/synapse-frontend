// @flow

import { Link } from 'redux-json-router';
import React from 'react';
import synapse_logo from './logo.png';

export default function Logo() {
  return (
    <div className="logo">
      <Link to="/" className="simple-text logo-mini">
        <img src={synapse_logo} alt="Synapse Logo" height="30" />
      </Link>

      <Link to="/" className="simple-text logo-normal">
        <img src={synapse_logo} alt="Synapse Logo" height="30" />
            &nbsp;&nbsp;Synapse
      </Link>
    </div>
  );
}
