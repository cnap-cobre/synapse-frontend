import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AddSftpFileSystemForm from '../../../components/AddSftpFileSystemForm/AddSftpFileSystemForm';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileSystemList from '../../../components/FileSystemList/FileSystemList';
import LinkBeocatButton from '../../../components/LinkBeocatButton/LinkBeocatButton';
import LinkDropboxButton from '../../../components/LinkDropboxButton/LinkDropboxButton';
import Card from '../../../physical_layout/Card';

export default class FileSystems extends React.Component {
  render() {
    return (
      <DefaultLayout>
        <div className="content">
          <div className="container-fluid">

            <Row>
              <Col md={12}>
                <Card header={(<h3>File Systems</h3>)} hr>
                  <FileSystemList />
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Card header={(<h4>Add Common File Systems</h4>)} hr>
                  <LinkBeocatButton />
                </Card>
              </Col>
              <Col md={6}>
                <Card header={(<h4>Connect External File System</h4>)} hr>
                  <LinkDropboxButton />
                </Card>
              </Col>
            </Row>


            <Row>
              <Col md={7}>
                <Card header={(<h4>Add an SFTP File System</h4>)} hr>
                  <AddSftpFileSystemForm />
                </Card>
              </Col>

              <Col md={5}>
                <Card header={(<h4>System Adding Instructions</h4>)} hr>
                  <h6>Overview</h6>
                  <p>
                      There are two types of file systems which you can add to your
                      Synapse account:  Agave-supported file systems and external file
                      systems.
                  </p>
                  <p>
                      Currently, Dropbox is the only external file system, but Google Drive,
                      Globus, and Box maybe be added on request.
                  </p>
                  <hr />
                  <h6>Dropbox</h6>
                  <p>
                      To add a Dropbox account, click the button above.  When prompted, enter your
                      Dropbox credentials and grant Synapse permission to access your Dropbox.
                      You may need to refresh to see the new system listed.
                  </p>
                  <hr />
                  <h6>Agave Systems (via SFTP)</h6>
                  <p>
                      Fill out the "Add an SFTP File System" form.  You will need to generate an
                      SSH key pair using ssh-keygen.  Add the public key to your ~/.ssh/authorized_keys
                      file on the target file system.  Copy and paste each key, public AND private,
                      into the form.  The system ID must be unique across all users, so it may help to
                      suffix it with your username.
                  </p>
                </Card>
              </Col>
            </Row>

          </div>
        </div>
      </DefaultLayout>
    );
  }
}
