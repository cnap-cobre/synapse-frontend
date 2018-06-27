import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import { CookiesProvider } from 'react-cookie';

import {FaPlus} from 'react-icons/lib/fa';

import AgaveBrowser from './AgaveBrowser/AgaveBrowser';
import DropboxBrowser from './DropboxBrowser/DropboxBrowser';

import HistoryPropTypes from '../../proptypes/HistoryPropTypes';

import './fileTabs.css'

const fileSystems = [
  {
    type: 'agave',
    name: 'ksu.beocat',
    displayName: 'Beocat'
  },
  {
    type: 'dropbox',
    name: 'dropbox',
    displayName: 'Dropbox'
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
    history: HistoryPropTypes
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
          <CookiesProvider>
            {system.type === 'agave' ? (
                <AgaveBrowser history={this.props.history}
                              prefix={'/files/' + system.name}
                              system={system.name}
                              systemDisplayName={system.displayName} />
            ) : (
                <DropboxBrowser history={this.props.history}
                                prefix={'/files/' + system.name}
                                system={system.name}
                                systemDisplayName={system.displayName} />
            )}
          </CookiesProvider>
        </Tab>
    );
  }

  render(){
    const urlActive = fileSystems.map(
        (fs)=>(this.props.history.location.pathname.indexOf(fs.name) !== -1)
    ).indexOf(true);
    //console.log(urlActive);
    return (
        <Tabs activeKey={(urlActive !== -1 ? urlActive : fileSystems.length)}
              id="FileBrowserTabs"
              animation={false}
              onSelect={(key)=>{
                //console.log(key);
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