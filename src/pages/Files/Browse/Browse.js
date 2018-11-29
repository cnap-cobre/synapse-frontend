import React from 'react';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileMetadata from '../../../components/FileMetadata/FileMetadata';
import HistoryMetadata from '../../../components/HistoryMetadata/HistoryMetadata';
import TabbedFileBrowser from '../../../components/TabbedFileBrowser/TabbedFileBrowser';
import Card from '../../../physical_layout/Card';
import './fileMacroLayout.scss';

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
                  <FileMetadata />
                  <hr />
                  <HistoryMetadata />
                </Card>
              </div>

            </div>

          </div>
        </div>
      </DefaultLayout>
    );
  }
}
