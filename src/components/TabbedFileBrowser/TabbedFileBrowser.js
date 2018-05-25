import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

import {FaPlus} from 'react-icons/lib/fa';

import AgaveBrowser from './AgaveBrowser/AgaveBrowser';

import PropTypes from 'prop-types';

import './fileTabs.css'

const fileSystems = [
  {
    type: 'agave',
    name: 'beocat',
    displayName: 'Beocat'
  },
  {
    type: 'agave',
    name: 'viper',
    displayName: 'Viper'
  }
];

const addFileSystem = (
    <span style={{
      color: '#5dc56c'
    }}>
          Add File System
          <FaPlus style={{
            color: 'green',
            position: 'relative',
            left: '0.4em',
          }}/>
        </span>
);


export default class TabbedFileBrowser extends Component {
  static propTypes = {
    history: PropTypes.shape({
      length: PropTypes.number.isRequired,
      location: PropTypes.object.isRequired,
      action: PropTypes.string.isRequired,
    }).isRequired
  };

  componentWillMount() {
    const path = this.props.history.location.pathname;
    const matches = [...fileSystems, {name:'new_file_system'}].map((fs)=>(path.indexOf(fs.name) !== -1))
    if (matches.indexOf(true) === -1){
      this.props.history.replace(fileSystems[0].name + '/');
    }
  }

  browserMapper(system, index) {
    return (
        <Tab eventKey={index}
             key={index}
             title={system.displayName}>
          <AgaveBrowser history={this.props.history}
                        prefix={'/files/' + system.name}
                        system={system.name}
                        systemDisplayName={system.displayName} />
        </Tab>
    );
  }

  render(){
    const urlActive = fileSystems.map(
        (fs)=>(this.props.history.location.pathname.indexOf(fs.name) !== -1)
    ).indexOf(true);
    console.log(urlActive);
    return (
        <Tabs activeKey={(urlActive !== -1 ? urlActive : fileSystems.length)}
              id="FileBrowserTabs"
              animation={false}
              onSelect={(key)=>{
                console.log(key);
                if (key === fileSystems.length){
                  this.props.history.push('/files/new_file_system/');
                } else {
                  this.props.history.push(
                      '/files/' + fileSystems[key].name + '/'
                  );
                }
              }}>

          {fileSystems.map(this.browserMapper.bind(this))}

          <Tab eventKey={fileSystems.length} title={addFileSystem}>
            Cake
          </Tab>
        </Tabs>

    );
  }
}