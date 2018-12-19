// @flow

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../physical_layout/Card';
import LaunchTerminalButton from '../../components/LaunchTerminalButton/LaunchTerminalButton';

const Terminal = () => (
  <DefaultLayout>
    <div className="content">
      <Grid fluid>
        <Row>
          <Col>
            <Card header={<h4 className="card-title">Launch a Terminal</h4>} hr>
              <p>
              To launch a JupyterHub terminal session, click the button below.
              You will be prompted to spawn a JupyterHub server.
              This may take some time dependening on the state of the Beocat queue.
              </p>

              <LaunchTerminalButton />
            </Card>
          </Col>
        </Row>
      </Grid>
    </div>
  </DefaultLayout>
);

export default Terminal;
