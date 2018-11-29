// @flow

import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import { removeModal } from '../../store/ui/modals/Modals';
import type { FileType } from '../../types/fileTypes';

type Props = {
  id: string,
  action: any,
  files: Array<FileType>,
  removeModal(string): typeof undefined,
}

type State = {
  show: boolean
}

class DeleteFileModal extends React.Component<Props, State> {
  state = {
    show: true,
  };

  closeModal = () => {
    const { id, removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      removeModal(id);
    }, 500);
  };

  doDelete = () => {
    const { action } = this.props;
    this.closeModal();
    action();
  };

  render = () => {
    const { files } = this.props;
    const { show } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
              Are you sure you want to delete the following files?
          </p>
          <ul>
            {files.map(
              (file) => {
                console.log(file);
                return (<li key={file.fullPath}>{file.name}</li>);
              },
            )}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button
            bsStyle="danger"
            onClick={this.doDelete}
          >
              Delete
          </Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

const mapDispatchToProps = {
  removeModal,
};

export default connect(
  null,
  mapDispatchToProps,
)(DeleteFileModal);
