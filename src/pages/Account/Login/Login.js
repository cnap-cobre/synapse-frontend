// @flow

import React from 'react';
import { connect } from 'react-redux';
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

const Login = (props) => {
  const { next } = props;
  return (
      <>
        <UnauthedNav />

        <WrapperFullPage>
          <Grid fluid>
            <Row>
              <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                <Card header={<h3 className="card-title">Login</h3>}>

                  <form action={`/accounts/login/?next=${next}`}>
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

                    <div className="btn-center">
                      <button
                        type="submit"
                        className="btn btn-success btn-fill btn-wd"
                      >
                        Sign In
                      </button>
                      &nbsp;
                      <button
                        type="button"
                        className="btn btn-wd"
                      >
                        Register
                      </button>
                    </div>
                  </form>

                  <HrWithOr />

                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <DropboxSignInButton next={next} />
                      <AgaveSignInButton next={next} />
                      <GlobusSignInButton next={next} />
                      <JupyterHubSignInButton next={next} />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Grid>
        </WrapperFullPage>
      </>
  );
};

const mapStateToProps = (store) => {
  const { queries } = store.router;
  return {
    next: queries.next ? queries.next : '/',
  };
};

export default connect(mapStateToProps)(Login);
