import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import React from 'react';
import TabbedFileBrowser from "../../components/TabbedFileBrowser/TabbedFileBrowser";


export default class Files extends React.Component {
  render() {
    return (
        <CardLayout>
          <TabbedFileBrowser prefix="/files" />
        </CardLayout>
    );
  }
}