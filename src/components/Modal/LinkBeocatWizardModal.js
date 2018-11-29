// @flow

import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import Agave from '../../services/Agave';
import { removeModal } from '../../store/ui/modals/Modals';

type Props = {
  id: string,
  removeModal(string): typeof undefined,
}

type State = {
  script: string,
  show: boolean,
  configString: string,
}

class LinkBeocatWizardModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      configString: '',
      script: '',
    };
  }

  componentDidMount() {
    this.fetchBeocatConfigScript();
  }

  fetchBeocatConfigScript = () => {
    fetch('/profile/add_beocat.sh').then((res) => {
      res.text().then((script) => {
        console.log(script);
        this.setState({
          script,
        });
      });
    });
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

  validationState = () => {
    const { configString } = this.state;

    if (configString.length === 0) {
      return null;
    }
    try {
      const x = JSON.parse(configString.replace(/\n/g, '\\\\n'));
      console.log(JSON.stringify(x));
      return 'success';
    } catch (e) {
      console.log(e);
      return 'error';
    }
  };

  render = () => {
    const { show, script } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Add SFTP File System Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Directions</h4>
          <h5>1. Log in to Beocat via SSH.</h5>
          <hr />
          <h5>2. Copy the script below and run it in your Beocat SSH session.</h5>
          <pre style={{
            height: '15.5em',
          }}
          >
            <code>
              {script}
            </code>
          </pre>
          <hr />
          <h5>3. Refresh your browser</h5>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  onFormSubmission: config => Agave.addFileSystem(store.csrf.token, config),
});

const mapDispatchToProps = {
  removeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkBeocatWizardModal);
