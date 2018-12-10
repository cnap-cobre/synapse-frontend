// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { FileType } from '../../types/fileTypes';

type Props = {
  disabled: boolean,
  file: FileType,
  children: React.Node,
  url: string,
}

const JupyterHubLink = (props: Props) => {
  const {
    disabled, file, children, url, hasJupyterHub, jupyterUserName,
  } = props;
  console.log(file);

  // Must be an agave file system and contain "beocat"
  if (file.provider !== 'agave' || file.system.indexOf('beocat') === -1) {
    return null;
  }

  if (!hasJupyterHub) {
    return (
      <a
        className={`contextMenu--option ${disabled ? 'contextMenu--option__disabled' : ''}`}
        href={`/accounts/jupyterhub/login/?process=connect&next=${url}`}
      >
          Connect JupyterHub
        {disabled && <span>&nbsp; (not yet supported)</span>}
      </a>
    );
  }

  return (
    <a
      className={`contextMenu--option ${disabled ? 'contextMenu--option__disabled' : ''}`}
      href={disabled ? '' : `https://jupyterhub.beocat.ksu.edu/user/${jupyterUserName}/tree/${file.path.split('/').slice(3).join('/')}`}
    >
        Open with JupyterHub
      {disabled && <span>&nbsp; (not yet supported)</span>}
    </a>
  );
};

const mapStateToProps = (store) => {
  const { router, userProfile } = store;

  if (!userProfile || userProfile.jupyter.length === 0) {
    return {
      url: router.pathname,
      hasJupyterHub: false,
      jupyterUserName: '',
    };
  }

  const jupyterProfile = userProfile.jupyter[0];
  const jupyterData = jupyterProfile.extra_data || {};

  return {
    url: router.pathname,
    hasJupyterHub: userProfile && userProfile.jupyter.length > 0,
    jupyterUserName: jupyterData.name,
  };
};

export default connect(mapStateToProps)(JupyterHubLink);
