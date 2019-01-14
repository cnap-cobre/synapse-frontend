// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-json-router';
import { Button } from 'react-bootstrap';
import { getJupyterHubUsername } from '../../store/userProfile/reducer';
import { getBeocatSystems } from '../../store/agaveFileSystems/reducer';

type Props = {
  username: string,
  beocatSystemUrlPrefix: string,
}

const FavoritesBar = (props: Props) => {
  const { username, beocatSystemUrlPrefix } = props;

  return (
    <div style={{
      backgroundColor: 'rgb(228,228,228)',
      padding: '5px 15px',
      borderRadius: '4px',
      marginBottom: '20px',
    }}
    >

      <span style={{
        fontWeight: 700,
        color: '#66615b',
      }}
      >
            Shortcuts:&nbsp;&nbsp;
      </span>

      <Link to={`${beocatSystemUrlPrefix}homes/${username}/`}>
        <Button bsSize="xsmall">
              Home
        </Button>
      </Link>

          &nbsp;

      <Link to={`${beocatSystemUrlPrefix}bulk/${username}/`}>
        <Button bsSize="xsmall">
              Bulk
        </Button>
      </Link>

          &nbsp;

      <Link to={`${beocatSystemUrlPrefix}scratch/${username}/`}>
        <Button bsSize="xsmall">
              Scratch
        </Button>
      </Link>
    </div>
  );
};

const mapStateToProps = (store) => {
  const username = getJupyterHubUsername(store);
  const beocatSystem = getBeocatSystems(store)[0];
  return {
    username,
    beocatSystemUrlPrefix: `/files/browse/${beocatSystem.provider}/${beocatSystem.id}/`,
  };
};

export default connect(
  mapStateToProps,
)(FavoritesBar);
