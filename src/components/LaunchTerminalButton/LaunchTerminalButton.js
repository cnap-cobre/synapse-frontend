// @flow

import React from 'react';
import { connect } from 'react-redux';
import { getJupyterHubUsername } from '../../store/userProfile/reducer';

type Props = {
  jupyterUserName: string,
}

const LaunchTerminalButton = (props: Props) => {
  const { jupyterUserName } = props;
  return (
    <a
      href={`https://jupyterhub.beocat.ksu.edu/user/${jupyterUserName}/terminals/1`}
      className="btn btn-danger btn-fill btn-wd"
      target="_blank"
      rel="noopener noreferrer"
    >
        Launch Terminal
    </a>
  );
};

const mapStateToProps = store => ({
  jupyterUserName: getJupyterHubUsername(store),
});

export default connect(
  mapStateToProps,
)(LaunchTerminalButton);
