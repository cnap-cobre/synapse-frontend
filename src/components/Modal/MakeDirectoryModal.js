import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { removeModal } from "../../store/Modals";

class MakeDirectoryModal extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true,
      name: ''
    };
  }

  closeModal = () => {
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.dispatch(removeModal(this.props.id));
    }, 500);
  };

  doMakeDirectory = () => {
    this.closeModal();
    this.props.action(this.state.name);
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') { return; }
    this.doMakeDirectory();
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please enter a name for the new folder:</p>

          <FormGroup>
            <FormControl type="text"
                         value={this.state.name}
                         autoFocus={true}
                         onChange={(e) => {this.setState({name: e.target.value})}}
                         onKeyPress={this.handleKeyPress}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle="success"
                  onClick={this.doMakeDirectory}>
            Create Folder
          </Button>
        </Modal.Footer>

      </Modal>
  );
}

export default connect()(MakeDirectoryModal)