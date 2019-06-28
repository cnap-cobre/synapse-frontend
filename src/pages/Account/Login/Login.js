// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Grid, Row, Col, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import { Link } from 'redux-json-router';
import Card from '../../../physical_layout/Card';
import HrWithOr from '../../../components/HrWithOr/HrWithOr';
import UnauthedNav from '../UnauthedNav';
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
        <UnauthedNav
          linkText="Register"
          linkTarget={`/account/register?next=${next}`}
        />

        <WrapperFullPage>
          <Grid fluid>
            <Row>
              <Col md={4} sm={6} mdOffset={4} smOffset={3}>
                <Card header={<h3 className="card-title">Log into Synapse</h3>}>

                  <form
                    action={`/accounts/login/?next=${next}`}
                    method="POST"
                  >
                    <FormGroup
                      controlId="login"
                    >
                      <ControlLabel>Username or Email *</ControlLabel>
                      <FormControl
                        type="text"
                        placeholder="Username or e-mail"
                        name="login"
                      />
                    </FormGroup>

                    <FormGroup
                      controlId="password"
                    >
                      <ControlLabel>Password *</ControlLabel>
                      <FormControl
                        type="password"
                        placeholder="password"
                        name="password"
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
                      <Link
                        to={`/account/register/?next=${next}`}
                        type="button"
                        className="btn btn-wd"
                      >
                        Register
                      </Link>
                    </div>
                  </form>

                  <HrWithOr />

                  <Row>
                    <Col xs={10} xsOffset={1}>
                      <DropboxSignInButton next={next} action="login" className="center-block" />
                      <AgaveSignInButton next={next} action="login" className="center-block" />
                      <GlobusSignInButton next={next} action="login" className="center-block" />
                      <JupyterHubSignInButton next={next} action="login" className="center-block" />
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
