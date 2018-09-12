import Alert from 'react-bootstrap/lib/Alert';
import {connect} from 'react-redux';
import React from 'react';

class FileSystemList extends React.Component {
  render() {
    if (this.props.fileSystems.length > 0) {
      return (
          <ul>
            {this.props.fileSystems.map((item) => (
                <li key={item.id}>{item.name}</li>
            ))}
          </ul>
      );
    } else {
      return (
          <Alert bsStyle="info">
            <strong>No file systems found.  Add one below.</strong>
          </Alert>
      );
    }
  }
}

const mapStateToProps = (store) => {
  const fileSystems = [
    ...store.fileSystems.systems.filter((sys) => (
        !sys.public
    ))
  ];

  return {
    fileSystems
  }
};

export default connect(mapStateToProps)(FileSystemList);