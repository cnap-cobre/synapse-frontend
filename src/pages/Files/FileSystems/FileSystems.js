// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Grid } from 'react-bootstrap';
import AddSftpFileSystemForm from '../../../components/AddSftpFileSystemForm/AddSftpFileSystemForm';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import FileSystemList from '../../../components/FileSystemList/FileSystemList';
import LinkBeocatButton from '../../../components/SocialButtons/LinkBeocatButton/LinkBeocatButton';
import Card from '../../../physical_layout/Card';
import { getExternalAccounts } from '../../../store/userProfile/reducer';
import { getBeocatConnected } from '../../../store/agaveFileSystems/reducer';
import { DropboxSignInButton } from '../../../components/SocialButtons/SocialSignInButton';

type Props = {
  externalAccounts: {
    agave: boolean,
    dropbox: boolean,
  },
  beocatConnected: boolean,
}

const FileSystems = (props: Props) => {
  const { externalAccounts, beocatConnected } = props;
  return (
    <DefaultLayout>
      <div className="content">
        <Grid fluid>
          <h4 className="title">
              File Systems
            <small />
          </h4>

          <FileSystemList />

          <hr />

          <h4 className="title">Add File Systems</h4>

          <Row>
            <Col md={6}>
              <Card header={(<h4 className="card-title">Shortcuts</h4>)} hr>
                {externalAccounts.dropbox ? (
                  <p>
                    <span className="ti-dropbox-alt" />
                        &nbsp;
                        Dropbox is linked.
                  </p>
                ) : (
                  <DropboxSignInButton next="/files/systems" action="connect" />
                )}
                {beocatConnected ? (
                  <p>
                        Beocat is connected.
                  </p>
                ) : (
                  <LinkBeocatButton />
                )}
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
                    Fill out the &quot;Add an SFTP File System&quot; form.  You will need to
                    generate an SSH key pair using ssh-keygen.  Add the public key to your
                    ~/.ssh/authorized_keys file on the target file system.  Copy and paste each
                    key, public AND private, into the form.  The system ID must be unique across
                    all users, so it may help to suffix it with your username.
                </p>
              </Card>
            </Col>
          </Row>

        </Grid>
      </div>
    </DefaultLayout>
  );
};

const mapStateToProps = store => ({
  externalAccounts: getExternalAccounts(store),
  beocatConnected: getBeocatConnected(store),
});

export default connect(
  mapStateToProps,
)(FileSystems);
