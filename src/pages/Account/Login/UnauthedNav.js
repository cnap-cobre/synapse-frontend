// @flow

import React from 'react';
import {
  Grid,
} from 'react-bootstrap';
import synapseLogo from '../../../components/Logo/logo.png';

const UnauthedNav = () => (
  <nav className="navbar navbar-transparent navbar-absolute">
    <Grid>
      <div className="navbar-header" style={{ textShadow: '2px 2px 10px #000' }}>
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
          <a href="register.html" style={{ textShadow: '2px 2px 10px #000' }}>
                Register
          </a>
        </li>
      </ul>
    </Grid>
  </nav>
);

export default UnauthedNav;
