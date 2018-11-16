import {connect} from 'react-redux';
import DirectoryBrowser from '../DirectoryBrowser/DirectoryBrowser';
import {fileListActions} from "../../store/files/Files";
import PropTypes from 'prop-types';
import React from 'react';
import Tab from 'react-bootstrap/lib/Tab';
import Tabs from 'react-bootstrap/lib/Tabs';
import './directoryTabs.css';

class TabbedDirectoryBrowser extends React.Component {
  static propTypes = {
    fileSystems: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    onTabSelect: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.path !== this.props.path && this.matchesFileSystem(this.props.path)) {
      this.props.dispatch(fileListActions.pending(this.props.path));
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

  systemUrlResolver = () => {
    const {path, fileSystems} = this.props;

    const urlActive = fileSystems.map(
        (fs) => (path.indexOf('/' + fs.provider + '/' + fs.id + '/') === 0)
    ).indexOf(true);

    return urlActive;
  };

  browserMapper = (system, index) => (
      <Tab eventKey={index}
           key={index}
           title={system.name}
      >
        <DirectoryBrowser
            path={this.props.path}
            handleDoubleClick={this.props.handleDoubleClick}
            system={this.props.fileSystems[index]}
        />
      </Tab>
  );


  render() {
    const selectedSystem = this.systemUrlResolver();
    return (
        <Tabs id="DirectoryBrowserTabs"
              activeKey={selectedSystem !== -1 ? selectedSystem : 0}
              onSelect={this.props.onTabSelect}
        >
          {this.props.fileSystems.map(this.browserMapper)}
        </Tabs>
    );
  }
}

export default connect()(TabbedDirectoryBrowser);