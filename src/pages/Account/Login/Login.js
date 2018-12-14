// @flow

import React from 'react';
import {
  Grid, Row, Col, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import Card from '../../../physical_layout/Card';
import HrWithOr from '../../../components/HrWithOr/HrWithOr';
import UnauthedNav from './UnauthedNav';
import WrapperFullPage from '../../../physical_layout/WrapperFullPage/WrapperFullPage';
import {
  DropboxSignInButton,
  AgaveSignInButton,
  GlobusSignInButton, JupyterHubSignInButton,
} from '../../../components/SocialButtons/SocialSignInButton';

const Login = () => (
    <>
      <UnauthedNav />

      <WrapperFullPage>
        <Grid fluid>
          <Row>
            <Col md={4} sm={6} mdOffset={4} smOffset={3}>
              <Card header={<h3 className="card-title">Login</h3>}>

                <form>
                  <FormGroup
                    controlId="username"
                  >
                    <ControlLabel>Username or Email*</ControlLabel>
                    <FormControl
                      type="text"
                      placeholder="Username or e-mail"
                    />
                  </FormGroup>

                  <FormGroup
                    controlId="password"
                  >
                    <ControlLabel>Password*</ControlLabel>
                    <FormControl
                      type="password"
                      placeholder="password"
                    />
                  </FormGroup>

                  <button
                    type="submit"
                    className="btn btn-success btn-fill btn-wd"
                  >
                  Sign In
                  </button>
                </form>

                <HrWithOr />

                <Row>
                  <Col xs={10} xsOffset={1}>
                    <DropboxSignInButton />
                    <AgaveSignInButton />
                    <GlobusSignInButton />
                    <JupyterHubSignInButton />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Grid>
      </WrapperFullPage>
    </>
);

export default Login;
