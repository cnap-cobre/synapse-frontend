import React, {Component} from 'react';
import {connect} from 'react-redux';
import { replace, push } from 'redux-json-router';
import {Alert, Tabs, Tab} from 'react-bootstrap';
import {Link} from 'redux-json-router';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import {toggle_dotfiles} from "../../actions/visualOptions";
import FileBrowser from "./FileBrowser/FileBrowser";
import './fileTabs.css';
import {fetchFilesIfNeeded} from "../../actions/files";

class TabbedFileBrowser extends Component {
  static propTypes = {
    isReady: PropTypes.bool.isRequired,
    fileSystems: PropTypes.array.isRequired,
    prefix: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    fetchFiles: PropTypes.func.isRequired
  };

  componentWillReceiveProps(nextProps) {
    console.log('next props', nextProps);
    const matches = nextProps.fileSystems.map(
        (sys) => nextProps.path.indexOf('/' + sys.id) !== -1
    );
    if(matches.indexOf(true) !== -1) {
      this.props.dispatch(fetchFilesIfNeeded(nextProps.path));
    }
  }

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
          <p>Learn how to add file
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
                    this.props.dispatch(push([
                      this.props.prefix,
                      this.props.fileSystems[key].id,
                      ''
                    ].join('/')))
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
  console.assert(props.pathname.indexOf(props.prefix) === 0);
  const remainingUrl = props.pathname.slice(props.prefix.length);
  const urlActive = props.fileSystems.map(
      (fs) => (remainingUrl.indexOf('/' + fs.id + '/') === 0)
  ).indexOf(true);

  if (props.isReady && urlActive === -1 ) {
    setTimeout(function(){

      if(props.pathname.indexOf(props.prefix) !== 0) {
        return;
      }

      props.dispatch(replace([
        props.prefix,
        props.fileSystems[0].id,
        ''
      ].join('/')));

    }, 50);
  }

  return urlActive;
};

const mapStateToProps = (store, ownProps) => {
  console.log('TabbedFileBrowserStore', store);

  const fileSystems = [
      ...store.agaveFileSystems.systems.filter((sys) => (
          !sys.public
      )).map((sys) => {
        sys.provider = 'agave';
        return sys;
      })
  ];

  if (store.userProfile.dropbox.length !== 0) {
    fileSystems.push({
      id: 'dropbox',
      provider: 'dropbox',
      description: 'Dropbox File System',
      name: 'Dropbox',
      status: 'UP',
      type: 'STORAGE'
    });
  }

  console.log('fileSystems', fileSystems);

  return{
    ...ownProps,
    isReady: store.userProfile.hasFetched && store.agaveFileSystems.hasFetched,
    fileSystems,
    pathname: store.router.pathname,
    path: store.router.pathname.slice(
        ownProps.prefix.length
    ),
    showDotfiles: store.visualOptions.showDotfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDotfiles: () => {
      dispatch(toggle_dotfiles())
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