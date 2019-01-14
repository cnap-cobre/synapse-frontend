// @flow

import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { removeModal } from "../../store/ui/modals/Modals";
import type {ViewImageFileModalType} from "../../types/modalTypes";

type Props = ViewImageFileModalType & {
  $removeModal(string): void,
}

type State = {
  show: boolean
}

class ViewImageFileModal extends React.Component<Props> {
  state = {
    show: true,
  };

  closeModal = () => {
    const { id, $removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      $removeModal(id);
    }, 500);
  };

  render() {
    const { file } = this.props;
    const { show } = this.state;
    const path = file.fullPath.split('/').slice(2).join('/')

    return (
        <Modal
            show={show}
            backdrop
            onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {file.name}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img
                src={file._links.self.href}
                style={{
                  width: '100%'
                }}
            />
          </Modal.Body>

          <Modal.Footer>

          </Modal.Footer>
        </Modal>
    )
  }
}

const mapDispatchToProps = {
  $removeModal: removeModal,
};

export default connect(
    null,
    mapDispatchToProps,
)(ViewImageFileModal);