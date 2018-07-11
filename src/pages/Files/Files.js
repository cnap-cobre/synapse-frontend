import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import TabbedFileBrowser from "../../components/TabbedFileBrowser/TabbedFileBrowser";
import React, { Component } from 'react';



export default class Files extends Component {
  render() {
    return (
        <CardLayout>
          <TabbedFileBrowser prefix="/files" />
        </CardLayout>
    );
  }
}
