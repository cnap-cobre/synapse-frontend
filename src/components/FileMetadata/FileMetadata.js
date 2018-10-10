import {connect} from 'react-redux';
import {fileIconResolver} from "../../util/FileIconResolver";
import {humanFileSize} from "../../util/FileSize";
import React from 'react';
import './fileMetadata.scss';


class FileMetadata extends React.Component{
  fileAttributesToComponents = (file) => {
    const list = [];

    list.push(React.cloneElement(
        fileIconResolver(file),
        {key: 'icon'}
    ));
    list.push(file.path);

    Object.keys(file).forEach((k, i) => {
      if(typeof file[k] === 'object') {
        return;
      }
      list.push(<div key={k}>
        {k + ': ' + file[k]}
      </div>);
    });

    return list;
  };

  render() {
    if(this.props.empty) {
      return (
          <div>
            <h6>Metadata</h6>
            <hr />
            Select a file or folder to view its details.
          </div>
      );
    } else if(this.props.files.length === 1) {
      const singleFile = this.props.files[0];
      return (
          <div className="fileMetadata">
            <h6>Metadata</h6>
            <hr />

            <div style={{
              fontSize: '3em',
              color: '#999',
              textAlign: 'center'
            }}>
              {React.cloneElement(fileIconResolver(singleFile))}
            </div>

            <div style={{
              textAlign: 'center',
              fontSize: '1.5em'
            }}>
              {this.props.files[0].name}
            </div>

            <table style={{
              overflow: 'auto'
            }}>
              <tbody>
              <tr>
                <td>Format:</td><td>{singleFile.format}</td>
              </tr>
              <tr>
                <td>Last Modified:</td><td>{singleFile.lastModified}</td>
              </tr>
              <tr>
                <td>Size:</td><td>{humanFileSize(singleFile.length)}</td>
              </tr>
              <tr>
                <td>Permissions:</td><td>{singleFile.permissions}</td>
              </tr>
              <tr>
                <td>Full Path:</td><td>{singleFile.path}</td>
              </tr>
              </tbody>
            </table>
          </div>
      );
    } else {
      return (
          <div>
            <h6>Metadata</h6>
            <hr />

            <p>Selected: {this.props.files.length} files</p>
            <p>Total Size: {humanFileSize(this.props.files.reduce((acc, item) => (
                acc + item.length
            ), 0))}</p>
          </div>
      )
    }
  }
}

const mapStateToProps = (store) => {
  const fileList = store.focusedFiles.list;

  if (fileList === undefined || fileList.length === 0) {
    return {
      filePaths: [],
      files: [],
      empty: true
    };
  }

  return {
    filePaths: fileList,
    files: fileList.map((filePath) => {
      const dirPath = [...filePath.split('/').slice(0, -1), ''].join('/');
      const fileName = filePath.split('/').slice(-1)[0];
      return store.files[dirPath].files.filter((item) => item.name === fileName)[0];
    }),
    empty: false
  };
};

export default connect(
    mapStateToProps
)(FileMetadata);