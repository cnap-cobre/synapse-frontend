import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileMetadata from '../../../components/FileMetadata/FileMetadata';
import HistoryMetadata from '../../../components/HistoryMetadata/HistoryMetadata';
import TabbedFileBrowser from '../../../components/TabbedFileBrowser/TabbedFileBrowser';
import Card from '../../../physical_layout/Card';
import './fileMacroLayout.scss';
import './metadataTabs.css';

export default class Browse extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="content fileContent">
          <div className="container-fluid">

            <div className="filePageFlexContainer">

              <div className="fileBrowserArea">
                <Card>
                  <TabbedFileBrowser prefix="/files/browse" />
                </Card>
              </div>

              <div className="fileMetaDataArea">
                <Card className="card">
                  <Tabs>
                    <Tab eventKey={1} title="Details">
                      <hr />
                      <FileMetadata />
                      <hr />
                      <h6>Metadata</h6>
                    </Tab>
                    <Tab eventKey={2} title="Activity">
                      <hr />
                      <HistoryMetadata />
                    </Tab>
                  </Tabs>
                  <hr />
                </Card>
              </div>

            </div>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}
