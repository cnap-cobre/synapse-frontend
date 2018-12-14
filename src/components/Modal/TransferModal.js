// @flow
import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

import FileBreadcrumbs from '../FileBreadcrumbs/FileBreadcrumbs';
import { removeModal } from '../../store/ui/modals/Modals';
import { fileListActions } from '../../store/files/Files';
import TabbedDirectoryBrowser from '../TabbedDirectoryBrowser/TabbedDirectoryBrowser';
import LinkComponent from './shared_components/LinkComponent';

import type { TransferModalType } from '../../types/modalTypes';

type Props = TransferModalType & {
  $removeModal(string): typeof undefined,
  $fetchFiles(string): typeof undefined
}

type State = {
  path: string,
  show: boolean,
  targetBrowserPaths: { [string]: string },
}

class TransferModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      targetBrowserPaths: {
        ...props.browserPaths,
      },
      path: props.browserPaths[`${props.fileSystems[0].provider}.${props.fileSystems[0].id}`],
      show: true,
    };

    console.log('STATE', this.state);
  }

  updatePath = (path) => {
    const { $fetchFiles } = this.props;

    $fetchFiles(path);
    this.setState(prevState => ({
      path,
      targetBrowserPaths: {
        ...prevState.targetBrowserPaths,
        [`${path.split('/')[1]}.${path.split('/')[2]}`]: path,
      },
    }));
  };

  onTabSelect = (key) => {
    const { fileSystems } = this.props;
    const { targetBrowserPaths } = this.state;
    console.log(fileSystems, 'FS', key);

    const selected = fileSystems[key];

    console.log('onTabSelectCalled', key);
    this.setState({
      path: targetBrowserPaths[`${selected.provider}.${selected.id}`],
    });
  };

  getCurrentSystem = () => {
    const { fileSystems } = this.props;
    const { path } = this.state;

    return fileSystems.filter(
      sys => sys.provider === path.split('/')[1]
            && sys.id === path.split('/')[2],
    )[0];
  };

  closeModal = () => {
    const { id, $removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      $removeModal(id);
    }, 500);
  };

  doTransfer = () => {
    const { action } = this.props;
    const { path } = this.state;

    this.closeModal();
    action(path);
  };

  render = () => {
    const { files, fileSystems } = this.props;
    const { path, show } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >

        <Modal.Header closeButton>
          <Modal.Title>Transfer Files</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>
              Transfer (
            {files.length}
              ) files to the following location:
          </p>
          <FileBreadcrumbs
            systemName={this.getCurrentSystem().name}
            prefix={path.split('/').slice(0, 3).join('/')}
            pathname={path}
            crumbComponent={(
              <LinkComponent onClick={this.updatePath} />
                )}
          />

          <TabbedDirectoryBrowser
            path={path}
            fileSystems={fileSystems}
            onTabSelect={this.onTabSelect}
            handleDoubleClick={this.updatePath}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.closeModal}>Cancel</Button>
          <Button onClick={this.doTransfer}>
              Start Transfer
          </Button>
        </Modal.Footer>

      </Modal>
    );
  }
}

const mapStateToProps = (store) => {
  const { browserPaths, fileSystems } = store;
  return {
    browserPaths,
    fileSystems: fileSystems.systems.filter(sys => (!sys.public)),
  };
};

const mapDispatchToProps = {
  $fetchFiles: fileListActions.pending,
  $removeModal: removeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransferModal);
