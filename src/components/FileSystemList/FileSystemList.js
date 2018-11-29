// @flow
import Alert from 'react-bootstrap/lib/Alert';
import { connect } from 'react-redux';
import React from 'react';
import type { FileSystemType } from '../../types/fileSystemTypes';

type Props = {
  fileSystems: Array<FileSystemType>
}

const FileSystemList = (props: Props) => {
  const { fileSystems } = props;

  if (fileSystems.length > 0) {
    return (
      <ul>
        {fileSystems.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
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
