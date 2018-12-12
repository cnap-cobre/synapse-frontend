// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import type { FileType } from '../../types/fileTypes';
import {getJupyterHubUsername} from "../../store/userProfile/reducer";

type Props = {
  disabled: boolean,
  file: FileType,
  url: string,
  jupyterUserName: ?string,
}

const JupyterHubLink = (props: Props) => {
  const {
    disabled, file, url, jupyterUserName,
  } = props;
  console.log(file);

  // Must be an agave file system and contain "beocat"
  if (file.provider !== 'agave' || file.system.indexOf('beocat') === -1) {
    return null;
  }

  if (!jupyterUserName) {
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
      href={disabled ? '' : `https://jupyterhub.beocat.ksu.edu/user/${jupyterUserName}/${file.type === 'file' ? 'edit' : 'tree'}/${file.path.split('/').slice(3).join('/')}`}
    >
        Open with JupyterHub
      {disabled && <span>&nbsp; (not yet supported)</span>}
    </a>
  );
};

const mapStateToProps = (store) => {
  const { router } = store;
  console.log(store)

  return {
    url: router.pathname,
    hasJupyterHub: getJupyterHubUsername(store) !== '',
    jupyterUserName: getJupyterHubUsername(store),
  };
};

export default connect(mapStateToProps)(JupyterHubLink);
