// @flow
import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import { fileListActions } from '../../store/files/Files';
import FileBreadcrumbs from '../FileBreadcrumbs/FileBreadcrumbs';
import { removeModal } from '../../store/ui/modals/Modals';
import TabbedDirectoryBrowser from '../TabbedDirectoryBrowser/TabbedDirectoryBrowser';
import LinkComponent from './shared_components/LinkComponent';

import type { TransferModalType } from '../../types/modalTypes';

type Props = TransferModalType & {
  removeModal(string): typeof undefined,
  fileListActionsPending(string): typeof undefined
}

type State = {
  path: string,
  show: boolean,
  targetBrowserPaths: { [string]: string },
}

class TransferModal extends React.Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    action: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.func,
    ]).isRequired,
  };

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
    const { fileListActionsPending } = this.props;

    fileListActionsPending(path);
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

    const { selected } = fileSystems[key];

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
    const { id, removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      removeModal(id);
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
  fileListActionsPending: fileListActions.pending,
  removeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransferModal);
