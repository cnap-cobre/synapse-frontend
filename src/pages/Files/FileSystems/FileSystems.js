import AddSftpFileSystemForm from '../../../components/AddSftpFileSystemForm/AddSftpFileSystemForm';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileSystemList from '../../../components/FileSystemList/FileSystemList';
import LinkBeocatButton from '../../../components/LinkAccountButtons/LinkBeocatButton/LinkBeocatButton';
import LinkDropboxButton from '../../../components/LinkAccountButtons/LinkDropboxButton/LinkDropboxButton';
import React from 'react';

export default class FileSystems extends React.Component {
  render() {
    return (
        <DefaultLayout>
          <div className="content">
            <div className="container-fluid">

              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h3>File Systems</h3>
                      <hr/>
                    </div>
                    <div className="card-content">
                      <FileSystemList />
                    </div>
                  </div>
                </div>
              </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Add Common File Systems</h4>
                    <hr/>
                  </div>
                  <div className="card-content">
                    <LinkBeocatButton/>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4>Connect External File Systems</h4>
                    <hr/>
                  </div>
                  <div className="card-content">
                    <LinkDropboxButton/>
                  </div>
                </div>
              </div>
            </div>

              <div className="row">
                <div className="col-md-7">
                  <div className="card">
                    <div className="card-header">
                      <h4>Add an SFTP File System</h4>
                      <hr/>
                    </div>
                    <div className="card-content">
                      <AddSftpFileSystemForm/>
                    </div>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="card">
                    <div className="card-header">
                      <h4>System Adding Instructions</h4>
                      <hr/>
                    </div>
                    <div className="card-content">
                      Instructions go here.
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