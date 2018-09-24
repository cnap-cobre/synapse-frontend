import {connect} from 'react-redux';
import {fileIconResolver} from "../../util/FileIconResolver";
import React from 'react';

class FileMetadata extends React.Component{
  fileAttributesToComponents = () => {
    const list = [];

    list.push(React.cloneElement(
        fileIconResolver(this.props.file),
        {key: 'icon'}
    ));
    list.push(this.props.filePath);

    Object.keys(this.props.file).forEach((k, i) => {
      console.log(k, typeof this.props.file[k]);
      if(typeof this.props.file[k] === 'object') {
        return;
      }
      list.push(<div key={k}>
        {k + ': ' + this.props.file[k]}
      </div>);
    });

    return list;
  };

  render() {
    if(this.props.filePath.length > 0) {
      return (
          <div>
            <h6>Metadata</h6>
            <hr />
            {this.fileAttributesToComponents()}
          </div>
      );
    } else {
      return (
          <div>
            <h6>Metadata</h6>
            <hr />
            First, select a file or directory.
          </div>
      );
    }
  }
}

const mapStateToProps = (store) => {
  const filePath = store.focusedFile.filePath;

  if (filePath === undefined || filePath.length === 0) {
    return {
      filePath: '',
      file: {}
    };
  }

  const dirPath = [...filePath.split('/').slice(0, -1), ''].join('/');
  const fileName = filePath.split('/').slice(-1)[0];
  const file = store.files[dirPath].files.filter((item) => item.name === fileName)[0];

  return {
    filePath,
    file
  };
};

export default connect(
    mapStateToProps
)(FileMetadata);