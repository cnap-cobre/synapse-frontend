// @flow
import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import { removeModal } from '../../store/ui/modals/Modals';
import type { SuccessMessageModalType } from '../../types/modalTypes';

type Props = SuccessMessageModalType & {
  removeModal(string): typeof undefined,
}

type State = {
  show: boolean,
}

class SuccessMessageModal extends React.Component<Props, State> {
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

  render = () => {
    const { text } = this.props;
    const { show } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={this.closeModal}
            bsStyle="success"
          >
              Ok
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
)(SuccessMessageModal);
