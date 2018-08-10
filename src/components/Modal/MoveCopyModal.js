import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import DirectoryBrowser from '../DirectoryBrowser/DirectoryBrowser';
import {fetchFilesIfNeeded} from "../../actions/files";
import FileBreadcrumbs from "../TabbedFileBrowser/FileBrowser/FileBreadcrumbs/FileBreadcrumbs";
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { removeModal } from "../../actions/modals";

const LinkComponent = (props) => (
    <a onClick={() => {
      props.onClick(props.to);
    }}>{props.children}</a>
);

class MoveCopyModal extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func
    ]).isRequired,
    title: PropTypes.string.isRequired,
    fileName: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    systemName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      show: true,
      path: props.path
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

  doMoveOrCopy = () => {
    this.closeModal();
    const absolutePath = [
      "",
      ...this.state.path.split('/').slice(2).slice(0, -1),
      this.props.fileName
    ].join('/');
    this.props.action(absolutePath);
  };

  updatePath = (path) => {
    this.props.dispatch(fetchFilesIfNeeded(path));
    this.setState({
      path
    });
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
            {this.props.prompt}
          </p>

          <FileBreadcrumbs systemName={this.props.systemName}
                           prefix="/"
                           pathname={this.state.path}
                           crumbComponent={(
                               <LinkComponent onClick={this.updatePath} />
                           )} />

          <DirectoryBrowser path={this.state.path}
                            handleDoubleClick={(path) => this.updatePath(path)}
                            style={{
                              maxHeight: '40vh',
                              overflowY: 'auto'
                            }}
          />


          <FormGroup>
            <FormControl type="text"
                         value={this.state.path}
                         onChange={(e) => {this.updatePath(e.target.value)}}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button bsStyle="danger"
                  onClick={this.doMoveOrCopy}
          >
            {this.props.submitText}
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

const mapStateToProps = (store, ownProps) => {
  return {

  };
};

export default connect(
    mapStateToProps,
)(MoveCopyModal);