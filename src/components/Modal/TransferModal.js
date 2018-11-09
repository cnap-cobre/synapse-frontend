import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import {fileListActions} from "../../store/Files";
import FileBreadcrumbs from "../TabbedFileBrowser/FileBrowser/FileBreadcrumbs/FileBreadcrumbs";
import Modal from 'react-bootstrap/lib/Modal';
import PropTypes from 'prop-types';
import React from 'react';
import { removeModal } from "../../store/Modals";
import TabbedDirectoryBrowser from '../TabbedDirectoryBrowser/TabbedDirectoryBrowser';


const LinkComponent = (props) => (
    <a onClick={() => {
      props.onClick(props.to);
    }}>{props.children}</a>
);

class TransferModal extends React.Component {
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
      targetBrowserPaths: {
          ...props.browserPaths
      },
      path: props.browserPaths[props.fileSystems[0].provider + '.' + props.fileSystems[0].id],
      show: true,
    };

    console.log("STATE", this.state);
  }

  updatePath = (path) => {
    this.props.dispatch(fileListActions.pending(path));
    this.setState({
      path,
      targetBrowserPaths: {
          ...this.state.targetBrowserPaths,
        [path.split('/')[1] + '.' + path.split('/')[2]]: path
      }
    });
  };

  onTabSelect = (key) => {
    console.log("onTabSelectCalled", key);
    this.setState({
       path: this.state.targetBrowserPaths[this.props.fileSystems[key].provider + '.' + this.props.fileSystems[key].id]
    });
  };

  getCurrentSystem = () => {
    return this.props.fileSystems.filter((sys) => {
      return sys.provider === this.state.path.split('/')[1] && sys.id === this.state.path.split('/')[2]
    })[0];
  };

  closeModal = () => {
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.dispatch(removeModal(this.props.id));
    }, 500);
  };

  doTransfer = () => {
    this.closeModal();
    this.props.action(this.state.path);
  };

  render = () => (
    <Modal show={this.state.show}
           backdrop={true}
           onHide={this.closeModal}
    >

      <Modal.Header closeButton={true}>
        <Modal.Title>Transfer Files</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Transfer ({this.props.files.length}) files to the following location:</p>
        <FileBreadcrumbs systemName={this.getCurrentSystem().name}
                         prefix={this.state.path.split('/').slice(0,3).join('/')}
                         pathname={this.state.path}
                         crumbComponent={(
                             <LinkComponent onClick={this.updatePath} />
                         )}
        />

        <TabbedDirectoryBrowser
            path={this.state.path}
            fileSystems={this.props.fileSystems}
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

const mapStateToProps = (store, ownProps) => {
  const {browserPaths, fileSystems, files} = store;
  return {
    browserPaths,
    fileSystems: fileSystems.systems.filter(sys => (!sys.public))
  };
};

export default connect(mapStateToProps)(TransferModal);