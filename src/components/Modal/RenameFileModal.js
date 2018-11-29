// @flow

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import { removeModal } from '../../store/ui/modals/Modals';
import type { RenameFileModalType } from '../../types/modalTypes';

type Props = RenameFileModalType & {
  removeModal(string): typeof undefined
}

type State = {
  fileName: string,
  show: boolean,
}

class RenameFileModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      fileName: props.fileName,
    };
  }

  closeModal = () => {
    const { id, removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      removeModal(id);
    }, 500);
  };

  doRename = () => {
    const { action } = this.props;
    const { fileName } = this.state;

    this.closeModal();
    action(fileName);
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') { return; }
    this.doRename();
  };

  render = () => {
    const { fileName: oldFileName } = this.props;
    const { show, fileName: newFileName } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>
              Rename
            &nbsp;
            {oldFileName}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
              Please enter a new name for this file:
          </p>

          <FormGroup>
            <FormControl
              type="text"
              value={newFileName}
              autoFocus
              onChange={(e) => { this.setState({ fileName: e.target.value }); }}
              onKeyPress={this.handleKeyPress}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button
            bsStyle="danger"
            onClick={this.doRename}
          >
              Rename
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
)(RenameFileModal);
