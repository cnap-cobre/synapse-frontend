import React, {Component} from 'react';
import {Tabs, Tab} from 'react-bootstrap';

import AgaveBrowser from 'Components/AgaveBrowser/AgaveBrowser';

import './fileTabs.css'

export default class TabbedFileBrowser extends Component{
  render(){
    return (
        <Tabs defaultActiveKey={1} id="FileBrowserTabs">
          <Tab eventKey={1} title="Beocat">
            <AgaveBrowser history={this.props.history}
                          prefix="/files"
                          system="beocat"
                          systemDisplayName="Beocat" />
          </Tab>
          <Tab eventKey={2} title="Pizza">Pizza</Tab>
          <Tab eventKey={3} title="Cake">Cake</Tab>
        </Tabs>

    );
  }
}