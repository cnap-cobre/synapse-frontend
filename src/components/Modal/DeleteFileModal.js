import React, {Component} from "react";
import PropTypes from 'prop-types';
import FileItemPropTypes from '../../proptypes/FileItemPropTypes';

import { Modal, Button } from 'react-bootstrap';

export class DeleteFileModal extends Component {
  
  static propTypes = {
    fileToBeDeleted: FileItemPropTypes,
    deleteFile: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.toggleShow = this.toggleShow.bind(this);

    this.state = {
      show: true
    };
  }

  toggleShow() {
    this.setState({ show: !this.state.show });
  }

  render = () => (
      <Modal show={this.state.show} onHide={this.toggleShow}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            Are you sure you want to delete {this.props.fileToBeDeleted.name}?
          </p>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.toggleShow}>Cancel</Button>
          <Button bsStyle="danger"
                  onClick={() => {this.props.deleteFile(); this.toggleShow();}}>
            Delete
          </Button>
        </Modal.Footer>

      </Modal>
  )
}