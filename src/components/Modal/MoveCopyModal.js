import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import DirectoryBrowser from '../DirectoryBrowser/DirectoryBrowser';
import FileBreadcrumbs from "../TabbedFileBrowser/FileBrowser/FileBreadcrumbs/FileBreadcrumbs";
import {fileListActions} from "../../store/Files";
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { removeModal } from "../../store/Modals";

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
    files: PropTypes.array.isRequired,
    promptVerb: PropTypes.string.isRequired,
    submitText: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    systemName: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);

    const pathTokens = props.path.split('/');

    this.state = {
      show: true,
      pathPrefix: pathTokens.slice(0,3).join('/'),
      path: ['', ...pathTokens.slice(3)].join('/')
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

  getFullDirectoryPath = () => ([
    this.state.pathPrefix,
    this.state.path
  ].join('/').replace(/([^:]\/)\/+/g, "$1"));

  doMoveOrCopy = () => {
    this.closeModal();
    const absolutePath = this.state.path;
    console.log("Absolute path", absolutePath);
    this.props.action(absolutePath);
  };

  updatePath = (path) => {
    this.props.dispatch(fileListActions.pending(path));
    const pathTokens = path.split('/');
    this.setState({
      pathPrefix: pathTokens.slice(0,3).join('/'),
      path: ['', ...pathTokens.slice(3)].join('/')
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
            Select a location to {this.props.promptVerb} the following files:
          </p>
          <ul>
            {this.props.files.map(
                file => <li key={file.fullPath}>
                  {file.name}
                </li>
            )}
          </ul>

          <FileBreadcrumbs systemName={this.props.systemName}
                           prefix={this.state.pathPrefix}
                           pathname={this.getFullDirectoryPath()}
                           crumbComponent={(
                               <LinkComponent onClick={this.updatePath} />
                           )} />

          <DirectoryBrowser path={this.getFullDirectoryPath()}
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