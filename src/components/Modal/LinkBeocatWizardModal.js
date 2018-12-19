// @flow

import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import Agave from '../../services/Agave';
import { removeModal } from '../../store/ui/modals/Modals';
import LaunchTerminalButton from '../LaunchTerminalButton/LaunchTerminalButton';
import { getExternalAccounts } from '../../store/userProfile/reducer';
import { AgaveSignInButton } from '../SocialButtons/SocialSignInButton';

type Props = {
  id: string,
  $removeModal(string): typeof undefined,
  externalAccounts: {
    agave: boolean,
  },
  pathname: string,
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
    const { id, $removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      $removeModal(id);
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
    const { externalAccounts, pathname } = this.props;
    const { show, script } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Add Beocat Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Directions</h4>
          <h5>1. Link your Agave account if you haven&apos;t already done so:</h5>
          {externalAccounts.agave ? (
              <>
                <i className="ti-check-box" />
                &nbsp;
                Agave account linked
              </>
          ) : (
            <AgaveSignInButton next={pathname} action="connect" />
          )}
          <hr />
          <h5>2. Log in to Beocat via SSH or launch a JupyterHub terminal:</h5>
          <LaunchTerminalButton />
          <hr />
          <h5>3. Copy the script below and run it in your Beocat SSH session.</h5>
          <pre style={{
            height: '15.5em',
          }}
          >
            <code>
              {script}
            </code>
          </pre>
          <p>Make sure you get all of it!</p>
          <hr />
          <h5>4. Refresh your browser window running Synapse</h5>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  onFormSubmission: config => Agave.addFileSystem(store.csrf.token, config),
  externalAccounts: getExternalAccounts(store),
  pathname: store.router.pathname,
});

const mapDispatchToProps = {
  $removeModal: removeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkBeocatWizardModal);
