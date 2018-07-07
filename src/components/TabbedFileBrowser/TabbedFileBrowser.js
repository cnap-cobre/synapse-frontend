import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Tabs, Tab} from 'react-bootstrap';
import { CookiesProvider } from 'react-cookie';

import {FaPlus} from 'react-icons/lib/fa';

import AgaveBrowser from './AgaveBrowser/AgaveBrowser';
import DropboxBrowser from './DropboxBrowser/DropboxBrowser';

import HistoryPropTypes from '../../proptypes/HistoryPropTypes';

import './fileTabs.css'

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


class TabbedFileBrowser extends Component {
  static propTypes = {
  };

  constructor(props) {
    super(props);
    this.state = {
      fileSystems: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const path = props.pathname;

    const fileSystems = [
      ...props.agaveSystems.filter((sys) => (
          !sys.public
      )).map((sys) => {
        sys.type = 'agave';
        sys.displayName = sys.name;
        sys.name = sys.id;
        return sys;
      })
    ];

    return {fileSystems: fileSystems};
  }

  browserMapper(system, index) {
    return (
        <Tab eventKey={index}
             key={index}
             title={system.displayName}>
          <CookiesProvider>
            {system.type === 'agave' ? (
                <AgaveBrowser prefix={'/files/' + system.name}
                              system={system.name}
                              systemDisplayName={system.displayName} />
            ) : (
                <DropboxBrowser prefix={'/files/' + system.name}
                                system={system.name}
                                systemDisplayName={system.displayName} />
            )}
          </CookiesProvider>
        </Tab>
    );
  }

  render(){
    console.log('look at that', this.props.agaveSystems);

    const fileSystems = this.state.fileSystems;

    const urlActive = fileSystems.map(
        (fs)=>(this.props.pathname.indexOf(fs.name) !== -1)
    ).indexOf(true);
    console.log(urlActive);
    return (
        <Tabs activeKey={(urlActive !== -1 ? urlActive : fileSystems.length)}
              id="FileBrowserTabs"
              animation={false}
              onSelect={(key)=>{
                // //console.log(key);
                // if (key === fileSystems.length){
                //   this.props.history.push('/files/new_file_system/');
                // } else {
                //   this.props.history.push(
                //       '/files/' + fileSystems[key].name + '/'
                //   );
                // }
              }}>

          {fileSystems.map(this.browserMapper.bind(this))}

          <Tab eventKey={fileSystems.length} title={addFileSystem}>
            Cake
          </Tab>
        </Tabs>

    );
  }
}

const mapStateToProps = (store) => {
  console.log(store);
  return {
    pathname: store.router.pathname,
    agaveSystems: store.agaveFileSystems.systems
  }
};

export default connect(mapStateToProps)(TabbedFileBrowser);