// @flow
import Alert from 'react-bootstrap/lib/Alert';
import { connect } from 'react-redux';
import React from 'react';
import type { FileSystemType } from '../../types/fileSystemTypes';
import { Row, Col, Grid } from 'react-bootstrap';
import Card from '../../physical_layout/Card';


type Props = {
  fileSystems: Array<FileSystemType>
}

const FileSystemList = (props: Props) => {
  const { fileSystems } = props;
  const dropboxIcon = <span className="ti-dropbox-alt"/>

  if (fileSystems.length > 0) {
    return (
        <Row>
          {fileSystems.map(item => (
              <Col key={item.id} lg={3} sm={4} xs={12}>
                <Card header={<h5 className="card-title">{item.provider === 'dropbox' ? dropboxIcon : null} {item.name}</h5>}>
                  <p>
                    {item.description}
                  </p>
                    <strong>id:</strong>&nbsp;{item.id}<br/>
                    <strong>provider:</strong>&nbsp;{item.provider}<br/>
                </Card>
              </Col>
          ))}
        </Row>
    );
  }
  return (
    <Alert bsStyle="info">
      <strong>No file systems found.  Add one below.</strong>
    </Alert>
  );
};

const mapStateToProps = (store) => {
  const fileSystems = [
    ...store.fileSystems.systems.filter(sys => (
      !sys.public
    )),
  ];

  return {
    fileSystems,
  };
};

export default connect(mapStateToProps)(FileSystemList);
