import { connect } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import {FaPlus} from 'react-icons/lib/fa';
import PropTypes from 'prop-types';
import { push } from 'redux-first-routing';
import React from 'react';
import {Tab, Tabs} from 'react-bootstrap';
import '../TabbedFileBrowser/fileTabs.css'


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


class TabbedFileBrowser extends React.Component {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    agaveFileSystems: PropTypes.array.isRequired,
    hasDropbox: PropTypes.bool.isRequired
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
      ...props.agaveFileSystems.filter((sys) => (
          !sys.public
      )).map((sys) => {
        sys.provider = 'agave';
        return sys;
      })
    ];

    // if (props.hasDropbox) {
    //   fileSystems.push({
    //     id: 'dropbox',
    //     provider: 'dropbox',
    //     description: 'Dropbox filesystem',
    //     name: 'Dropbox',
    //     status: 'UP',
    //     type: 'STORAGE'
    //   })
    // }

    console.log('asdfasdfasdf', fileSystems);

    return {fileSystems: fileSystems};
  }

  browserMapper(system, index) {
    return (
        <Tab eventKey={index}
             key={index}
             title={system.name}>
          <CookiesProvider>
            {system.provider === 'agave' ? (
                <AgaveBrowser id={system.id}
                              prefix={'/files/' + system.id}
                              displayName={system.name} />
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
    console.log('look at that', this.state.fileSystems);

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
                console.log(key);
                if (key === fileSystems.length){
                  this.props.dispatch(push('/files/new_file_system/'));
                } else {
                  this.props.dispatch(push(
                      '/files/' + fileSystems[key].name + '/'
                  ));
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

const mapStateToProps = (store) => {
  console.log(store);
  return {
    pathname: store.router.pathname,
    agaveFileSystems: store.agaveFileSystems.systems,
    hasDropbox: store.userProfile.dropbox.length !== 0
  }
};

export default connect(mapStateToProps)(TabbedFileBrowser);