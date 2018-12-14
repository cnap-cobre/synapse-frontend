// @flow

import { connect } from 'react-redux';
import { FaArrowUp } from 'react-icons/fa';
import React from 'react';
import { fileActions } from '../../../store/files/Files';

type Props = {
  path: string,
  $uploadFile(file: any, path: string): void,
}

class UploadFile extends React.Component<Props> {
  fileUploadButton = null;

  fileInput: ?HTMLInputElement = null;

  uploadForm = null;

  handleClick = (e) => {
    e.preventDefault();

    if (!this.fileInput) {
      return;
    }

    this.fileInput.click();
  };

  handleFileSelection = (e) => {
    const { path, $uploadFile } = this.props;
    e.preventDefault();

    const { fileInput } = this;

    if (!fileInput) {
      return;
    }

    const { files } = fileInput;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < files.length; i++) {
      $uploadFile(files[i], path);
    }
  };

  render = () => (
    <div>
      <div style={{
        overflow: 'hidden',
        position: 'relative',
      }}
      >
        <form
          ref={(ref) => { this.uploadForm = ref; }}
          style={{
            opacity: '1',
            position: 'absolute',
            right: '-50px',
          }}
        >
          <input
            type="file"
            multiple
            ref={(ref) => { this.fileInput = ref; }}
            onChange={this.handleFileSelection}
          />
        </form>
      </div>
      <button
        className="btn btn-xs btn-default"
        ref={(ref) => { this.fileUploadButton = ref; }}
        onClick={this.handleClick}
        type="button"
        style={{
          height: '2.7em',
          marginTop: '0.5em',
          float: 'right',
          marginRight: '0.5em',
        }}
      >
        <FaArrowUp style={{
          marginTop: '0.3em',
          marginBottom: '-0.2em',
          fontSize: '1.2em',
        }}
        />
        &nbsp;Upload
      </button>
    </div>
  );
}

const mapDispatchToProps = {
  $uploadFile: fileActions.uploadFile,
};

export default connect(
  null,
  mapDispatchToProps,
)(UploadFile);
