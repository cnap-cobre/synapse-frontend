// @flow

import Alert from 'react-bootstrap/lib/Alert';
import { connect } from 'react-redux';
import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import { push, replace, Link } from 'redux-json-router';
import { actions as agaveFileSystemsActions } from '../../store/agaveFileSystems/AgaveFileSystems';
import FileBrowser from '../FileBrowser/FileBrowser';
import { fileListActions } from '../../store/files/Files';
import Loader from '../Loader/Loader';
import { setBrowserPath } from '../../store/ui/browserPaths/BrowserPaths';
import { toggleDotfiles } from '../../store/ui/visualOptions/VisualOptions';
import { actions as userProfileActions } from '../../store/userProfile/UserProfile';
import { getBrowserPaths, getShowDotfiles } from '../../store/ui/reducer';
import type { FileSystemType } from '../../types/fileSystemTypes';

type Props = {
  isReady: boolean,
  showDotfiles: boolean,
  fileSystems: Array<FileSystemType>,
  prefix: string,
  path: string,
  pathname: string,
  $replace(path: string): void,
  $push(path: string): void,
  $toggleDotfiles(): void,
  $fetchFilesIfNeeded(string): void,
  $setBrowserPath(key: string, path: string): void, // eslint-disable-line
  $fetchAgaveFileSystems(): void,
  $fetchUserProfile(): void,
  browserPaths: {},
}

const systemUrlResolverAndRedirector = (props: Props) => {
  const {
    path, pathname, prefix, fileSystems, isReady, browserPaths, $replace, $setBrowserPath,
  } = props;

  if (pathname.indexOf(prefix) !== 0) {
    return 0;
  }

  const remainingUrl = pathname.slice(prefix.length);
  const urlActive = fileSystems.map(
    fs => (remainingUrl.indexOf(`/${fs.provider}/${fs.id}/`) === 0),
  ).indexOf(true);

  if (isReady && urlActive === -1) {
    setTimeout(() => {
      // Stop if we are on a different section of the site
      if (pathname.indexOf(prefix) !== 0) {
        return;
      }

      $replace([
        prefix,
        fileSystems[0].provider,
        fileSystems[0].id,
        '',
      ].join('/'));
    }, 50);
  }

  // Set browserPath when navigating directly to a file location on first load
  // Any time the browserPath mismatches the current path, we fix it
  if (urlActive !== -1) {
    const browserPathKey = [
      fileSystems[urlActive].provider,
      fileSystems[urlActive].id,
    ].join('.');
    if (browserPaths[browserPathKey] !== path) {
      console.log('MISMATCH FROM INITIAL PAGE LOAD', path, browserPaths[browserPathKey]);
      setTimeout(() => {
        $setBrowserPath(browserPathKey, path);
      }, 1);
    }
  }

  return urlActive;
};


class TabbedFileBrowser extends React.Component<Props> {
  componentDidMount() {
    const {
      path, prefix, $replace, $fetchAgaveFileSystems, $fetchUserProfile, $fetchFilesIfNeeded,
    } = this.props;

    if (path.split('/').length < 3) {
      console.log('Waiting on redirect/replace to default file system.');
      return;
    }

    if (path.split('/').slice(-1)[0] !== '') {
      $replace(`${prefix + path}/`);
    }

    if (this.matchesFileSystem(path)) {
      $fetchFilesIfNeeded(path);
    } else {
      $fetchAgaveFileSystems();
      $fetchUserProfile();
      $fetchFilesIfNeeded(path);
    }
  }

  componentDidUpdate(prevProps) {
    const { path, $fetchFilesIfNeeded } = this.props;

    if (prevProps.path !== path && this.matchesFileSystem(path)) {
      $fetchFilesIfNeeded(path);
    }
  }

  matchesFileSystem = (path) => {
    const { fileSystems } = this.props;

    const matches = fileSystems.map(
      sys => path.indexOf(`${sys.provider}/${sys.id}`) !== -1,
    );
    return matches.length > 0 && matches.indexOf(true) !== -1;
  };

  browserMapper = (system, index) => {
    const {
      prefix, path, pathname, showDotfiles, $toggleDotfiles, $fetchFilesIfNeeded,
    } = this.props;
    return (
      <Tab
        eventKey={index}
        key={system.id}
        title={system.name}
      >
        <FileBrowser
          system={system}
          prefix={prefix}
          systemPrefix={
                [
                  prefix,
                  system.provider,
                  system.id,
                ].join('/')
              }
          path={path}
          pathname={pathname}
          showDotfiles={showDotfiles}
          toggleDotfiles={$toggleDotfiles}
          fetchFiles={$fetchFilesIfNeeded}
        />
      </Tab>
    );
  }

  render() {
    const {
      isReady, fileSystems, prefix, browserPaths, $push,
    } = this.props;

    if (!isReady) {
      return (<Loader visible />);
    }

    if (fileSystems.length === 0) {
      return (
        <>
          <Alert bsStyle="info">
            <strong>No file systems found.</strong>
          </Alert>
          <p>
            Connect your Dropbox account
            &nbsp;
            <a href="/accounts/social/connections/">here</a>
            .
          </p>
          <p>
            Add your own remote SFTP file systems
            <Link to="/files/add_new_filesystem">here</Link>
            .
          </p>
        </>
      );
    }


    const selectedSystem = systemUrlResolverAndRedirector(this.props);
    return (
      <Tabs
        id="FileBrowserTabs"
        activeKey={selectedSystem !== -1 ? selectedSystem : 0}
        onSelect={(key) => {
          if (selectedSystem !== key) {
            const browserPathKey = [
              fileSystems[key].provider,
              fileSystems[key].id,
            ].join('.');
            $push([
              prefix,
              browserPaths[browserPathKey].slice(1), // Get rid of leading slash
            ].join('/'));
          }
        }}
      >
        {fileSystems.map(this.browserMapper)}
      </Tabs>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const fileSystems = [
    ...store.fileSystems.systems.filter(sys => (
      !sys.public
    )),
  ];

  return {
    ...ownProps,
    isReady: (
      !store.userProfile.loading
        && !store.fileSystems.loading
        && store.fileSystems.systems.length !== 0
    ),
    fileSystems,
    pathname: store.router.pathname,
    browserPaths: getBrowserPaths(store),
    path: store.router.pathname.slice(
      ownProps.prefix.length,
    ),
    showDotfiles: getShowDotfiles(store),
  };
};

const mapDispatchToProps = {
  $toggleDotfiles: toggleDotfiles,
  $replace: replace,
  $push: push,
  $fetchFilesIfNeeded: fileListActions.ifNeeded,
  $setBrowserPath: setBrowserPath,
  $fetchAgaveFileSystems: agaveFileSystemsActions.pending,
  $fetchUserProfile: userProfileActions.pending,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabbedFileBrowser);
