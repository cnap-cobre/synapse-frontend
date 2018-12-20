// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Grid,
} from 'react-bootstrap';
import { Link } from 'redux-json-router';
import synapseLogo from '../../components/Logo/logo.png';

type Props = {
  linkText: string,
  linkTarget: string,
}

const UnauthedNav = (props: Props) => {
  const { linkText, linkTarget } = props;
  return (
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
              <Link to={linkTarget} style={{ textShadow: '2px 2px 10px #000' }}>
                {linkText}
              </Link>
            </li>
          </ul>
        </Grid>
      </nav>
  );
}

const mapStateToProps = (store) => {
  const { queries } = store.router;
  return {
    next: queries.next ? queries.next : '/',
  };
};

export default connect(mapStateToProps)(UnauthedNav);
