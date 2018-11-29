// @flow

import { connect } from 'react-redux';
import React from 'react';
import { format, formatDistance } from 'date-fns';
import { fileIconResolver } from '../../util/FileIconResolver';
import { humanFileSize } from '../../util/FileSize';
import './fileMetadata.scss';
import { getFocusedFilePaths } from '../../store/ui/reducer';
import type { FileType } from '../../types/fileTypes';

type Props = {
  empty: boolean,
  files: Array<FileType>
}

type State = {

}

class FileMetadata extends React.Component<Props, State> {
  fileAttributesToComponents = (file) => {
    const list = [];

    list.push(React.cloneElement(
      fileIconResolver(file),
      { key: 'icon' },
    ));
    list.push(file.path);

    Object.keys(file).forEach((key) => {
      if (typeof file[key] === 'object') {
        return;
      }
      list.push(
        <div key={key}>
          {`${key}: ${file[key]}`}
        </div>,
      );
    });

    return list;
  };

  render() {
    const { empty, files } = this.props;

    if (empty) {
      return (
        <div>
          <h6>Metadata</h6>
          <hr />
            Select a file or folder to view its details.
        </div>
      );
    } if (files.length === 1) {
      const singleFile = files[0];
      return (
        <div className="fileMetadata">
          <h6>Metadata</h6>
          <hr />

          <div style={{
            fontSize: '3em',
            color: '#999',
            textAlign: 'center',
          }}
          >
            {React.cloneElement(fileIconResolver(singleFile))}
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '1.5em',
          }}
          >
            {files[0].name}
          </div>

          <table style={{
            overflow: 'auto',
          }}
          >
            <tbody>
              <tr>
                <td>Format:</td>
                <td>{singleFile.format}</td>
              </tr>
              <tr>
                <td>Last Modified:</td>
                <td title={format(singleFile.lastModified, 'MM/dd/yyyy HH:mm:ss - OOOO')}>
                  { formatDistance(singleFile.lastModified, Date.now()) }
                </td>
              </tr>
              <tr>
                <td>Size:</td>
                <td>{humanFileSize(singleFile.length)}</td>
              </tr>
              <tr>
                <td>Permissions:</td>
                <td>{singleFile.permissions}</td>
              </tr>
              <tr>
                <td>Full Path:</td>
                <td>{singleFile.path}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
    return (
      <div>
        <h6>Metadata</h6>
        <hr />

        <p>
Selected:
          {files.length}
          {' '}
files
        </p>
        <p>
Total Size:
          {humanFileSize(files.reduce((acc, item) => (
            acc + item.length
          ), 0))}
        </p>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const fileList = getFocusedFilePaths(store);

  if (fileList === undefined || fileList.length === 0) {
    return {
      filePaths: [],
      files: [],
      empty: true,
    };
  }

  return {
    filePaths: fileList,
    files: fileList.map((filePath) => {
      const dirPath = [...filePath.split('/').slice(0, -1), ''].join('/');
      const fileName = filePath.split('/').slice(-1)[0];
      return store.files[dirPath].files.filter(item => item.name === fileName)[0];
    }),
    empty: false,
  };
};

export default connect(
  mapStateToProps,
)(FileMetadata);
