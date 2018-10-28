import Agave from '../../services/Agave';
import Button from 'react-bootstrap/lib/Button';
import {connect} from "react-redux";
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Cookies from 'js-cookie';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import Modal from 'react-bootstrap/lib/Modal';
import React from 'react';
import {addModal, removeModal} from "../../actions/modals";
import {invalidateAgaveFileSystems, requestAgaveFileSystems} from "../../actions/agaveFileSystems";

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

          <form>
            <FormGroup
                controlId="beocatConfig"
                validationState={this.validationState()}
            >
              <ControlLabel>Beocat Config:</ControlLabel>
              <FormControl
                  componentClass="textarea"
                  placeholder="Paste the Beocat config here!"
                  rows={10}
                  value={this.state.configString}
                  onChange={
                    (e) => {
                      this.setState({
                        configString: e.target.value.trim().replace(/(?:\r\n|\r|\n)/g, '')
                      })
                    }
                  }
              />
              <HelpBlock>The input is valid when the box turns green.</HelpBlock>
            </FormGroup>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-success btn-fill"
                  disabled={this.validationState() !== 'success'}
                  onClick={() => {
            this.closeModal();
            this.props.onFormSubmission(
                JSON.parse(this.state.configString)
            ).then(() => {
              this.props.dispatch(invalidateAgaveFileSystems());
              this.props.dispatch(requestAgaveFileSystems());
              this.props.dispatch(addModal({
                modalType: 'successMessage',
                text: 'The new SFTP file system has been added successfully.'
              }));
            });
          }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

const mapStateToProps = (store) => {
  return {
    onFormSubmission: (config) => Agave.addFileSystem(store.csrf.token, config)
  };
};

export default connect(mapStateToProps)(LinkBeocatWizardModal);