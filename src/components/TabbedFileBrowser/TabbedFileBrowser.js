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
import { setFocusedFile } from '../../store/ui/focusedFiles/FocusedFiles';
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
  toggleDotfiles(): typeof undefined,
  fetchFiles(): typeof undefined,
  browserPaths: {},
  dispatch(any): typeof undefined,
}

const systemUrlResolverAndRedirector = (props) => {
  if (props.pathname.indexOf(props.prefix) !== 0) {
    return 0;
  }

  const remainingUrl = props.pathname.slice(props.prefix.length);
  const urlActive = props.fileSystems.map(
    fs => (remainingUrl.indexOf(`/${fs.provider}/${fs.id}/`) === 0),
  ).indexOf(true);

  if (props.isReady && urlActive === -1) {
    setTimeout(() => {
      // Stop if we are on a different section of the site
      if (props.pathname.indexOf(props.prefix) !== 0) {
        return;
      }

      props.dispatch(replace([
        props.prefix,
        props.fileSystems[0].provider,
        props.fileSystems[0].id,
        '',
      ].join('/')));
    }, 50);
  }

  // Set browserPath when navigating directly to a file location on first load
  // Any time the browserPath mismatches the current path, we fix it
  if (urlActive !== -1) {
    const browserPathKey = [
      props.fileSystems[urlActive].provider,
      props.fileSystems[urlActive].id,
    ].join('.');
    if (props.browserPaths[browserPathKey] !== props.path) {
      console.log('MISMATCH FROM INITIAL PAGE LOAD', props.path, props.browserPaths[browserPathKey]);
      setTimeout(() => {
        props.dispatch(setBrowserPath(browserPathKey, props.path));
      }, 1);
    }
  }

  return urlActive;
};


class TabbedFileBrowser extends React.Component<Props> {
  componentDidMount() {
    const { path, prefix, dispatch } = this.props;

    if (path.split('/').length < 3) {
      console.log('Waiting on redirect/replace to default file system.');
      return;
    }

    if (path.split('/').slice(-1)[0] !== '') {
      dispatch(
        replace(`${prefix + path}/`),
      );
    }

    if (this.matchesFileSystem(path)) {
      dispatch(fileListActions.ifNeeded(path));
    } else {
      dispatch(agaveFileSystemsActions.pending());
      dispatch(userProfileActions.pending());
      dispatch(fileListActions.ifNeeded(path));
    }
  }

  componentDidUpdate(prevProps) {
    const { path, dispatch } = this.props;

    if (prevProps.path !== path && this.matchesFileSystem(path)) {
      dispatch(fileListActions.ifNeeded(path));
    }
  }

  matchesFileSystem = (path) => {
    const { fileSystems } = this.props;

    const matches = fileSystems.map(
      sys => path.indexOf(`${sys.provider}/${sys.id}`) !== -1,
    );
    return matches.length > 0 && matches.indexOf(true) !== -1;
  };

  unfocusFiles = () => {
    const { dispatch } = this.props;
    dispatch(setFocusedFile(''));
  };

  browserMapper = (system, index) => {
    const {
      prefix, path, pathname, showDotfiles, toggleDotfiles, fetchFiles,
    } = this.props;
    return (
      <Tab
        eventKey={index}
        key={index}
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
          toggleDotfiles={toggleDotfiles}
          fetchFiles={fetchFiles}
        />
      </Tab>
    );
  }

  render() {
    const {
      isReady, fileSystems, dispatch, prefix, browserPaths,
    } = this.props;

    if (!isReady) {
      return (<Loader visible />);
    }

    if (fileSystems.length === 0) {
      return (
        <React.Fragment>
          <Alert bsStyle="info">
            <strong>No file systems found.</strong>
          </Alert>
          <p>
            Connect your Dropbox account
            {' '}
            <a href="/accounts/social/connections/">here</a>
.
          </p>
          <p>
Add your own remote SFTP file
            systems
            <Link to="/files/add_new_filesystem">here</Link>
.
          </p>
        </React.Fragment>
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
            dispatch(push([
              prefix,
              browserPaths[browserPathKey].slice(1), // Get rid of leading slash
            ].join('/')));
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

const mapDispatchToProps = dispatch => ({
  toggleDotfiles: () => {
    dispatch(toggleDotfiles());
  },
  fetchFiles: (path) => {
    dispatch(fileListActions.ifNeeded(path));
  },
  dispatch,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TabbedFileBrowser);
