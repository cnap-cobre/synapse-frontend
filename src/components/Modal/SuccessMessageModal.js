import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import {removeModal} from "../../store/Modals";

export default class SuccessMessageModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: true
    };
  }

  closeModal = () => {
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.dispatch(
          removeModal(this.props.id)
      );
    }, 500);
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.text}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.closeModal}
                  bsStyle='success'
          >
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
  );
}