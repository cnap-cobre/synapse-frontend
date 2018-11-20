import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { removeModal } from '../../store/ui/modals/Modals';

class RenameFileModal extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    fileName: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true,
      fileName: props.fileName
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

  doRename = () => {
    this.closeModal();
    this.props.action(this.state.fileName);
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') { return; }
    this.doRename();
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Rename {this.props.fileName}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Please enter a new name for this file:
          </p>

          <FormGroup>
            <FormControl type="text"
                         value={this.state.fileName}
                         autoFocus={true}
                         onChange={(e) => {this.setState({fileName: e.target.value})}}
                         onKeyPress={this.handleKeyPress}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle="danger"
                  onClick={this.doRename}>
            Rename
          </Button>
        </Modal.Footer>

      </Modal>
  )
}

export default connect()(RenameFileModal);