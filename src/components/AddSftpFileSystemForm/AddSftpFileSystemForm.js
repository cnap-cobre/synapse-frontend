import {addModal} from "../../store/Modals";
import Agave from '../../services/Agave';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import {connect} from 'react-redux';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import HelpBlock from 'react-bootstrap/lib/HelpBlock';
import React from 'react';
import { actions as agaveFileSystemsActions } from '../../store/AgaveFileSystems';


class AddSftpFileSystemForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      id: '',
      name: '',
      description: '',
      site: '',
      host: '',
      port: 22,
      username: '',
      publicKey: '',
      privateKey: ''
    };
  }

  mapToRequestShape = (config) => {
    return {
      id: config.id,
      name: config.name,
      status: 'UP',
      type: 'STORAGE',
      description: config.description,
      site: config.site,
      storage: {
        host: config.host,
        port: config.port,
        protocol: 'SFTP',
        auth: {
          username: config.username,
          publicKey: config.publicKey,
          privateKey: config.privateKey,
          type: 'SSHKEYS'
        }
      }
    };
  };

  agaveForm = () => (
        <Form horizontal>
          <FormGroup controlId="systemId">
            <Col componentClass={ControlLabel} sm={3}>
              Id*
            </Col>
            <Col sm={9}>
              <FormControl type="text"
                           value={this.state.id}
                           onChange={
                             (e) => {this.setState({id: e.target.value})}
                           }
              />
              <HelpBlock>
                Id must be globally unique and cannot be reused once deleted.
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemName">
            <Col componentClass={ControlLabel} sm={3}>
              Name*
            </Col>
            <Col sm={9}>
              <FormControl type="text"
                           value={this.state.name}
                           onChange={
                             (e) => {this.setState({name: e.target.value})}
                           }
              />
              <HelpBlock>
                Common display name for this system
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemDescription">
            <Col componentClass={ControlLabel} sm={3}>
              Description
            </Col>
            <Col sm={9}>
              <FormControl componentClass="textarea"
                           placeholder="System Description (Optional)"
                           value={this.state.description}
                           onChange={
                             (e) => {this.setState({description: e.target.value})}
                           }
              />
              <HelpBlock>
                Verbose description of this system.  (Optional)
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemSite">
            <Col componentClass={ControlLabel} sm={3}>
              Site
            </Col>
            <Col sm={9}>
              <FormControl type="text"
                           value={this.state.site}
                           onChange={
                             (e) => {this.setState({site: e.target.value})}
                           }
              />
              <HelpBlock>
                Website URL associated with this system. (Optional)
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemHost">
            <Col componentClass={ControlLabel} sm={3}>
              Host URL*
            </Col>
            <Col sm={9}>
              <FormControl type="text"
                           value={this.state.host}
                           onChange={
                             (e) => {this.setState({host: e.target.value})}
                           }
              />
              <HelpBlock>
                Host URL for connecting via SSH/SFTP
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemPort">
            <Col componentClass={ControlLabel} sm={3}>
              Port Number*
            </Col>
            <Col sm={9}>
              <FormControl type="number"
                           value={this.state.port}
                           onChange={
                             (e) => {this.setState({
                               port: parseInt(e.target.value)
                             })}
                           }
              />
              <HelpBlock>
                Host Port for connecting via SSH/SFTP
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemUsername">
            <Col componentClass={ControlLabel} sm={3}>
              Username*
            </Col>
            <Col sm={9}>
              <FormControl type="text"
                           value={this.state.username}
                           onChange={
                             (e) => {this.setState({username: e.target.value})}
                           }
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="systemPublicKey">
            <Col componentClass={ControlLabel} sm={3}>
              Public Key*
            </Col>
            <Col sm={9}>
              <FormControl componentClass="textarea"
                           placeholder="Public Key"
                           value={this.state.publicKey}
                           onChange={
                             (e) => {this.setState({publicKey: e.target.value})}
                           }
              />
              <HelpBlock>
                Public Key (generated by ssh-keygen).  Ensure this is added
                to your authorized_keys file in this system.
              </HelpBlock>
            </Col>
          </FormGroup>

          <FormGroup controlId="systemPrivateKey">
            <Col componentClass={ControlLabel} sm={3}>
              Private Key*
            </Col>
            <Col sm={9}>
              <FormControl componentClass="textarea"
                           placeholder="Private Key"
                           value={this.state.privateKey}
                           onChange={
                             (e) => {this.setState({privateKey: e.target.value})}
                           }
              />
              <HelpBlock>
                Private Key.  Don't share this one.
              </HelpBlock>
            </Col>
          </FormGroup>

          <div style={{
            textAlign: 'center'
          }}>
            <Button className="btn btn-success btn-fill"
                    onClick={() => {
                      this.props.onFormSubmission(
                          this.mapToRequestShape(this.state)
                      ).then(() => {
                        this.props.dispatch(agaveFileSystemsActions.pending());
                        this.props.dispatch(addModal({
                          modalType: 'successMessage',
                          text: 'The new SFTP file system has been added successfully.'
                        }));
                      });
                    }}
            >
              Add System
            </Button>
          </div>
        </Form>
  );

  render = () => (
      this.props.hasLinkedAgaveAccount ? this.agaveForm() : (
          <p>Please link your Agave account first.</p>
      )
  );
}

const mapStateToProps = (store) => {
  return {
    hasLinkedAgaveAccount: store.userProfile.agave.length !== 0,
    onFormSubmission: (config) => Agave.addFileSystem(store.csrf.token, config)
  };
};

export default connect(mapStateToProps)(AddSftpFileSystemForm);