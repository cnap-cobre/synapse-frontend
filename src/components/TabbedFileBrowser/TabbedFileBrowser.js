import Alert from 'react-bootstrap/lib/Alert';
import {connect} from 'react-redux';
import {fetchAgaveFileSystemsIfNeeded} from "../../actions/agaveFileSystems";
import {fetchFilesIfNeeded} from "../../actions/files";
import {fetchProfileIfNeeded} from "../../actions/userProfile";
import FileBrowser from "./FileBrowser/FileBrowser";
import {Link} from 'redux-json-router';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import React from 'react';
import {setFocusedFile} from "../../actions/focusedFiles";
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import {toggleDotfiles} from "../../actions/visualOptions";
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
    const matches = this.props.fileSystems.map(
      (sys) => {
        return nextProps.path.indexOf(sys.provider + '/' + sys.id) !== -1;
      }
    );

    if(matches.length > 0 && matches.indexOf(true) !== -1) {
      this.props.dispatch(fetchFilesIfNeeded(this.props.path));
    } else {
      this.props.dispatch(
        fetchAgaveFileSystemsIfNeeded()
      ).then(() => {
        this.props.dispatch(fetchProfileIfNeeded());
      }).then(() => {
        this.props.dispatch(fetchFilesIfNeeded(this.props.path));
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.path !== this.props.path) {
      this.props.dispatch(fetchFilesIfNeeded(this.props.path));
    }
  }

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
                      this.props.browserPaths[browserPathKey]
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
    isReady: store.userProfile.hasFetched && store.fileSystems.hasFetched,
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
      dispatch(fetchFilesIfNeeded(path))
    },
    dispatch
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TabbedFileBrowser);
