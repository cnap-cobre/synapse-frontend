import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from "react";
import { removeModal } from "../../store/modals/actions";

class DeleteFileModal extends React.Component {
  
  static propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    files: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true,
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

  doDelete = () => {
    this.closeModal();
    this.props.action();
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header closeButton={true}>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete the following files?
          </p>
          <ul>
            {this.props.files.map(
                file => {
                  console.log(file);
                  return (<li key={file.fullPath}>{file.name}</li>);
                }
            )}
          </ul>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle="danger"
                  onClick={this.doDelete}>
            Delete
          </Button>
        </Modal.Footer>

      </Modal>
  )
}

export default connect()(DeleteFileModal);