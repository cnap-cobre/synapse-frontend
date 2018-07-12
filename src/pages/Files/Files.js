import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import {Link} from 'redux-json-router';
import React from 'react';
import TabbedFileBrowser from "../../components/TabbedFileBrowser/TabbedFileBrowser";


export default class Files extends React.Component {
  render() {
    return (
        <CardLayout>
          <Link to='/files/add_new_filesystem'
                style={{
                  position: 'absolute',
                  right: '1.2em',
                  top: '1.5em'
                }}
          >Add New System</Link>
          <TabbedFileBrowser prefix="/files" />
        </CardLayout>
    );
  }
}