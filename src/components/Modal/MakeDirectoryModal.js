// @flow

import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import { removeModal } from '../../store/ui/modals/Modals';

type Props = {
  id: string,
  action: any,
  removeModal(string): typeof undefined,
};

type State = {
  show: boolean,
  name: string,
}

class MakeDirectoryModal extends React.Component<Props, State> {
  state = {
    show: true,
    name: '',
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

  doMakeDirectory = () => {
    const { action } = this.props;
    const { name } = this.state;

    this.closeModal();
    action(name);
  };

  handleKeyPress = (event) => {
    if (event.key !== 'Enter') { return; }
    this.doMakeDirectory();
  };

  render = () => {
    const { show, name } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Please enter a name for the new folder:</p>

          <FormGroup>
            <FormControl
              type="text"
              value={name}
              autoFocus
              onChange={(e) => { this.setState({ name: e.target.value }); }}
              onKeyPress={this.handleKeyPress}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button
            bsStyle="success"
            onClick={this.doMakeDirectory}
          >
              Create Folder
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
)(MakeDirectoryModal);
