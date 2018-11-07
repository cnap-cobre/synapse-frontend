import Agave from '../../services/Agave';
import {connect} from "react-redux";
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import {addModal, removeModal} from "../../store/modals/actions";

class LinkBeocatWizardModal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      show: true,
      configString: '',
      script: ''
    };
  }

  componentDidMount() {
    this.fetchBeocatConfigScript();
  }

  fetchBeocatConfigScript = () => {
    fetch("/profile/add_beocat.sh").then((res) => {
      res.text().then((script) => {
        console.log(script);
        this.setState({
          script
        });
      });
    });
  };

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

  validationState = () => {
    if (this.state.configString.length === 0) {
      return null;
    }
    try{
      const x = JSON.parse(this.state.configString.replace(/\n/g, "\\\\n"));
      console.log(JSON.stringify(x));
      return 'success';
    } catch (e) {
      console.log(e);
      return 'error';
    }
  };

  render = () => (
      <Modal show={this.state.show}
             backdrop={true}
             onHide={this.closeModal}
      >
        <Modal.Header>
          <Modal.Title>Add SFTP File System Wizard</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Directions</h4>
          <h5>1. Log in to Beocat via SSH.</h5>
          <hr/>
          <h5>2. Copy the script below and run it in your Beocat SSH session.</h5>
          <pre style={{
            height: '15.5em'
          }}><code>
            {this.state.script}
          </code></pre>
          <hr/>
          <h5>3. Refresh your browser</h5>
        </Modal.Body>
      </Modal>
  );
}

const mapStateToProps = (store) => {
  return {
    onFormSubmission: (config) => Agave.addFileSystem(store.csrf.token, config)
  };
};

export default connect(mapStateToProps)(LinkBeocatWizardModal);