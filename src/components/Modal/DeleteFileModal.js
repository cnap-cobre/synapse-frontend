import React, {Component} from "react";
import PropTypes from 'prop-types';
import FileItemPropTypes from '../../proptypes/FileItemPropTypes';
import { Modal } from 'react-bootstrap';

export default class DeleteFileModal extends React.Component {
  
  static propTypes = {
    fileToBeDeleted: FileItemPropTypes,
    deleteFile: PropTypes.func.isRequired
  }

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

  render() {
     console.log('render in DeleteFileModal is being called.');

    return (
     
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>
              Are you sure you want to delete {fileToBeDeleted}?
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.toggleShow}>Cancel</Button>
            <Button bsStyle="danger" 
                    onClick={() => {this.props.DeleteFile; this.toggleShow;}}>
              Delete
            </Button>
          </Modal.Footer>

        </Modal>
      </div>
    );
  }
}