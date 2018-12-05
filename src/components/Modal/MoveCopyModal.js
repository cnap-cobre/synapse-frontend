// @flow

import * as React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import Modal from 'react-bootstrap/lib/Modal';
import { fileListActions } from '../../store/files/Files';
import FileBreadcrumbs from '../FileBreadcrumbs/FileBreadcrumbs';
import DirectoryBrowser from '../DirectoryBrowser/DirectoryBrowser';
import { removeModal } from '../../store/ui/modals/Modals';
import type { FileType } from '../../types/fileTypes';
import LinkComponent from './shared_components/LinkComponent';


type Props = {
  id: string,
  action: any,
  title: string,
  files: Array<FileType>,
  promptVerb: string,
  submitText: string,
  path: string,
  systemName: string,
  removeModal(string): typeof undefined,
  fileListActionsPending(string): typeof undefined,
}

type State = {
  show: boolean,
  pathPrefix: string,
  path: string,
}

class MoveCopyModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    const pathTokens = props.path.split('/');

    this.state = {
      show: true,
      pathPrefix: pathTokens.slice(0, 3).join('/'),
      path: ['', ...pathTokens.slice(3)].join('/'),
    };
  }

  closeModal = () => {
    const { id, removeModal } = this.props;

    this.setState({
      show: false,
    });

    setTimeout(() => {
      removeModal(id);
    }, 500);
  };

  getFullDirectoryPath = () => {
    const { pathPrefix, path } = this.state;

    return ([
      pathPrefix,
      path,
    ].join('/').replace(/([^:]\/)\/+/g, '$1'));
  };

  doMoveOrCopy = () => {
    const { action } = this.props;
    const { path } = this.state;

    this.closeModal();
    const absolutePath = path;
    console.log('Absolute path', absolutePath);
    action(absolutePath);
  };

  updatePath = (path) => {
    const { fileListActionsPending } = this.props;

    fileListActionsPending(path);
    const pathTokens = path.split('/');
    this.setState({
      pathPrefix: pathTokens.slice(0, 3).join('/'),
      path: ['', ...pathTokens.slice(3)].join('/'),
    });
  };

  render = () => {
    const {
      title, promptVerb, files, systemName, submitText,
    } = this.props;
    const { show, pathPrefix, path } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
              Select a location to
            {' '}
            {promptVerb}
            {' '}
              the following files:
          </p>
          <ul>
            {files.map(
              file => (
                <li key={file.fullPath}>
                  {file.name}
                </li>
              ),
            )}
          </ul>

          <FileBreadcrumbs
            systemName={systemName}
            prefix={pathPrefix}
            pathname={this.getFullDirectoryPath()}
            crumbComponent={(
              <LinkComponent onClick={this.updatePath} />
                )}
          />

          <DirectoryBrowser
            path={this.getFullDirectoryPath()}
            handleDoubleClick={p => this.updatePath(p)}
            style={{
              maxHeight: '40vh',
              overflowY: 'auto',
            }}
          />


          <FormGroup>
            <FormControl
              type="text"
              value={path}
              onChange={(e) => { this.updatePath(e.target.value); }}
            />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button
            bsStyle="danger"
            onClick={this.doMoveOrCopy}
          >
            {submitText}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  removeModal,
  fileListActionsPending: fileListActions.pending,
};

export default connect(
  null,
  mapDispatchToProps,
)(MoveCopyModal);
