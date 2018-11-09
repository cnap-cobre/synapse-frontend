import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileMetadata from "../../../components/FileMetadata/FileMetadata";
import HistoryMetadata from '../../../components/HistoryMetadata/HistoryMetadata';
import React from 'react';
import TabbedFileBrowser from "../../../components/TabbedFileBrowser/TabbedFileBrowser";
import './fileMacroLayout.scss';

export default class Browse extends React.Component {
  render() {
    return (
        <DefaultLayout>
          <div className="content fileContent">
            <div className="container-fluid">

          <div className="filePageFlexContainer">

            <div className="fileBrowserArea">
              <div className="card">
                <div className="card-content">

                  <TabbedFileBrowser prefix="/files/browse" />

                </div>
              </div>
            </div>

            <div className="fileMetaDataArea">
              <div className="card">
                <div className="card-content">

                  <FileMetadata/>
                  <hr />
                  <HistoryMetadata/>

                </div>
              </div>
            </div>

          </div>

            </div>
          </div>
        </DefaultLayout>
    );
  }
}