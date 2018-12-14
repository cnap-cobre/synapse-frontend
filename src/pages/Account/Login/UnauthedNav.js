// @flow

import React from 'react';
import {
  Grid,
} from 'react-bootstrap';
import synapseLogo from '../../../components/Logo/logo.png';

const UnauthedNav = () => (
  <nav className="navbar navbar-transparent navbar-absolute">
    <Grid>
      <div className="navbar-header">
        <a className="navbar-brand" href="/">
          <img
            src={synapseLogo}
            alt="Synapse Logo"
            height="40"
            style={{
              display: 'inline-block',
            }}
          />
            &nbsp;
            Synapse
        </a>
      </div>
      <ul className="nav navbar-nav navbar-right">
        <li>
          <a href="register.html">
                Register
          </a>
        </li>
      </ul>
    </Grid>
  </nav>
);

export default UnauthedNav;
