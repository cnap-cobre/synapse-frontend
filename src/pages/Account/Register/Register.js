// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Grid, Row, Col, FormGroup, ControlLabel, FormControl,
} from 'react-bootstrap';
import Card from '../../../physical_layout/Card';
import WrapperFullPage from '../../../physical_layout/WrapperFullPage/WrapperFullPage';

const Register = (props) => {
  const { next } = props;
  return (
    <WrapperFullPage>
      <Grid fluid>
        <Row>
          <Col md={4} sm={6} mdOffset={4} smOffset={3}>
            <Card header={<h3 className="card-title">Register</h3>} hr>
              <form
                action={`/accounts/signup/?next=${next}`}
                method="POST"
              >
                <FormGroup
                  controlId="email"
                >
                  <ControlLabel>Email *</ControlLabel>
                  <FormControl
                    type="email"
                    placeholder="example@ksu.edu"
                    name="email"
                  />
                </FormGroup>

                <FormGroup
                  controlId="username"
                >
                  <ControlLabel>Username *</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder="username"
                    name="username"
                  />
                </FormGroup>

                <FormGroup
                  controlId="password1"
                >
                  <ControlLabel>Password *</ControlLabel>
                  <FormControl
                    type="password"
                    placeholder="password"
                    name="password1"
                  />
                </FormGroup>

                <FormGroup
                  controlId="password2"
                >
                  <ControlLabel>Password (again) *</ControlLabel>
                  <FormControl
                    type="password"
                    placeholder="password"
                    name="password2"
                  />
                </FormGroup>

                <div className="btn-center">
                  <button
                    type="submit"
                    className="btn btn-success btn-fill btn-wd"
                  >
                      Register
                  </button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Grid>
    </WrapperFullPage>
  );
};

const mapStateToProps = (store) => {
  const { queries } = store.router;
  return {
    next: queries.next ? queries.next : '/',
  };
};

export default connect(mapStateToProps)(Register);
