// @flow

import React from 'react';
import { Row, Col, Grid } from 'react-bootstrap';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import UserDetails from '../../components/UserDetails/UserDetails';
import UserProfilePhoto from '../../components/UserProfilePhoto/UserProfilePhoto';
import Card from '../../physical_layout/Card';

const Account = () => (
  <DefaultLayout>
    <div className="content">
      <Grid fluid>
        <Row>
          <Col>
            <Card header={<h3 className="card-title">My Account</h3>} hr>
              <UserProfilePhoto />
              <UserDetails />
            </Card>
          </Col>
        </Row>
      </Grid>
    </div>
  </DefaultLayout>
);

export default Account;
