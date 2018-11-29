// @flow

import { connect } from 'react-redux';
import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import { fileListActions } from '../../store/files/Files';
import DirectoryBrowser from '../DirectoryBrowser/DirectoryBrowser';
import './directoryTabs.css';
import type { FileSystemType } from '../../types/fileSystemTypes';

type Props = {
  fileSystems: Array<FileSystemType>,
  path: string,
  onTabSelect(): typeof undefined,
  handleDoubleClick(): typeof undefined,
  fileListActionsPending(string): typeof undefined,
}

class TabbedDirectoryBrowser extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const { fileListActionsPending, path } = this.props;

    if (prevProps.path !== path && this.matchesFileSystem(path)) {
      fileListActionsPending(path);
    }
  }

  matchesFileSystem = (path) => {
    const { fileSystems } = this.props;
    const matches = fileSystems.map(
      sys => path.indexOf(`${sys.provider}/${sys.id}`) !== -1,
    );
    return matches.length > 0 && matches.indexOf(true) !== -1;
  };

  systemUrlResolver = () => {
    const { path, fileSystems } = this.props;

    const urlActive = fileSystems.map(
      fs => (path.indexOf(`/${fs.provider}/${fs.id}/`) === 0),
    ).indexOf(true);

    return urlActive;
  };

  browserMapper = (system, index) => {
    const { path, handleDoubleClick, fileSystems } = this.props;

    return (
      <Tab
        eventKey={index}
        key={index}
        title={system.name}
      >
        <DirectoryBrowser
          path={path}
          handleDoubleClick={handleDoubleClick}
          system={fileSystems[index]}
        />
      </Tab>
    );
  }


  render() {
    const { onTabSelect, fileSystems } = this.props;
    const selectedSystem = this.systemUrlResolver();
    return (
      <Tabs
        id="DirectoryBrowserTabs"
        activeKey={selectedSystem !== -1 ? selectedSystem : 0}
        onSelect={onTabSelect}
      >
        {fileSystems.map(this.browserMapper)}
      </Tabs>
    );
  }
}

const mapDispatchToProps = {
  fileListActionsPending: fileListActions.pending,
};

export default connect(
  null,
  mapDispatchToProps,
)(TabbedDirectoryBrowser);
