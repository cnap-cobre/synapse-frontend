import {actions as agaveFileSystemsActions} from "../../store/agaveFileSystems/AgaveFileSystems";
import Alert from 'react-bootstrap/lib/Alert';
import {connect} from 'react-redux';
import FileBrowser from "./FileBrowser/FileBrowser";
import {fileListActions} from "../../store/files/Files";
import {Link} from 'redux-json-router';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import {setBrowserPath} from "../../store/ui/browserPaths/BrowserPaths";
import {setFocusedFile} from "../../store/ui/focusedFiles/FocusedFiles";
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import {toggleDotfiles} from "../../store/ui/visualOptions/VisualOptions";
import { actions as userProfileActions } from '../../store/userProfile/UserProfile';
import { push, replace } from 'redux-json-router';
import './fileTabs.css';

class TabbedFileBrowser extends React.Component {
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    fileSystems: PropTypes.array.isRequired,
    prefix: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    fetchFiles: PropTypes.func.isRequired
  };

  componentDidMount() {
    if(this.props.path.split('/').length < 3) {
      console.log("Waiting on redirect/replace to default file system.");
      return;
    }

    if(this.props.path.split('/').slice(-1)[0] !== '') {
      this.props.dispatch(
          replace(this.props.prefix + this.props.path + '/')
      )
    }

    if(this.matchesFileSystem(this.props.path)) {
      this.props.dispatch(fileListActions.ifNeeded(this.props.path));
    } else {
      this.props.dispatch(agaveFileSystemsActions.pending());
      this.props.dispatch(userProfileActions.pending());
      this.props.dispatch(fileListActions.ifNeeded(this.props.path));
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.path !== this.props.path && this.matchesFileSystem(this.props.path)) {
      this.props.dispatch(fileListActions.ifNeeded(this.props.path));
    }
  }

  matchesFileSystem = (path) => {
    const matches = this.props.fileSystems.map(
        (sys) => {
          return path.indexOf(sys.provider + '/' + sys.id) !== -1;
        }
    );
    return matches.length > 0 && matches.indexOf(true) !== -1;
  };

  unfocusFiles = (e) => {
    this.props.dispatch(setFocusedFile(''));
  };

  render() {
    if (!this.props.isReady) {
      return (<Loader visible={true}/>);
    }

    else if(this.props.fileSystems.length === 0) {
      return (
          <React.Fragment>
          <Alert bsStyle="info">
            <strong>No file systems found.</strong>
          </Alert>
          <p>
            Connect your Dropbox account <a href="/accounts/social/connections/">here</a>.
          </p>
          <p>Add your own remote SFTP file
            systems <Link to='/files/add_new_filesystem'>here</Link>.</p>
          </React.Fragment>
      );
    }

    else {
      const selectedSystem = systemUrlResolverAndRedirector(this.props);
      return (
          <Tabs id="FileBrowserTabs"
                activeKey={selectedSystem !== -1 ? selectedSystem : 0}
                onSelect={(key) => {
                  if (selectedSystem !== key) {
                    const browserPathKey = [
                      this.props.fileSystems[key].provider,
                      this.props.fileSystems[key].id
                    ].join('.');
                    this.props.dispatch(push([
                      this.props.prefix,
                      this.props.browserPaths[browserPathKey].slice(1) // Get rid of leading slash
                    ].join('/')));
                  }
                }}
          >
            {this.props.fileSystems.map(this.browserMapper)}
          </Tabs>
      );
    }
  }

  browserMapper = (system, index) => (
      <Tab eventKey={index}
           key={index}
           title={system.name}>
        <FileBrowser system={system}
                     prefix={this.props.prefix}
                     systemPrefix={
                       [
                         this.props.prefix,
                         system.provider,
                         system.id
                       ].join('/')
                     }
                     path={this.props.path}
                     pathname={this.props.pathname}
                     showDotfiles={this.props.showDotfiles}
                     toggleDotfiles={this.props.toggleDotfiles}
                     fetchFiles={this.props.fetchFiles}
        />
      </Tab>
  );
}

const systemUrlResolverAndRedirector = (props) => {
  if(props.pathname.indexOf(props.prefix) !== 0) {
    return 0;
  }

  const remainingUrl = props.pathname.slice(props.prefix.length);
  const urlActive = props.fileSystems.map(
      (fs) => (remainingUrl.indexOf('/' + fs.provider + '/' + fs.id + '/') === 0)
  ).indexOf(true);

  if (props.isReady && urlActive === -1 ) {
    setTimeout(function(){

      // Stop if we are on a different section of the site
      if(props.pathname.indexOf(props.prefix) !== 0) {
        return;
      }

      props.dispatch(replace([
        props.prefix,
        props.fileSystems[0].provider,
        props.fileSystems[0].id,
        ''
      ].join('/')));

    }, 50);
  }

  // Set browserPath when navigating directly to a file location on first load
  // Any time the browserPath mismatches the current path, we fix it
  if (urlActive !== -1) {
    const browserPathKey = [
      props.fileSystems[urlActive].provider,
      props.fileSystems[urlActive].id
    ].join('.');
    if (props.browserPaths[browserPathKey] !== props.path) {
      console.log("MISMATCH FROM INITIAL PAGE LOAD", props.path, props.browserPaths[browserPathKey]);
      setTimeout(function() {
        props.dispatch(setBrowserPath(browserPathKey, props.path));
      }, 1);
    }
  }

  return urlActive;
};

const mapStateToProps = (store, ownProps) => {
  const fileSystems = [
      ...store.fileSystems.systems.filter((sys) => (
          !sys.public
      ))
  ];

  return{
    ...ownProps,
    isReady: (
        !store.userProfile.loading &&
        !store.fileSystems.loading &&
        store.fileSystems.systems.length !== 0
    ),
    fileSystems,
    pathname: store.router.pathname,
    browserPaths: store.browserPaths,
    path: store.router.pathname.slice(
        ownProps.prefix.length
    ),
    showDotfiles: store.visualOptions.showDotfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDotfiles: () => {
      dispatch(toggleDotfiles())
    },
    fetchFiles: (path) => {
      dispatch(fileListActions.ifNeeded(path))
    },
    dispatch
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabbedFileBrowser);
