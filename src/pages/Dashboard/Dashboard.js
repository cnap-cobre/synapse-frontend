import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Card from '../../physical_layout/Card';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';

const Dashboard = () => (
  <DefaultLayout>
    <div className="content">
      <Grid fluid>
        <Row>
          <Col xs={12}>
            <Card header={<h3 className="card-title">About</h3>} hr>
              <p>
                Synapse is an open science gateway for the psychological sciences, tying together tools,
                applications, and data in support of the research process.  The goal of the Synapse platform is
                to aid researchers in conducting reproducible research.  Synapse is supported by the Cognitive
                and Neurobiological Approaches to Plasticity (CNAP) Center of Biomedical Research Excellence
                (COBRE) of the National Institutes of Health under grant number P20GM113109.
              </p>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={8}>
            <Card header={<h4 className="card-title">Getting Started</h4>} hr>
              <p>
                Synapse integrates with several services which you may already be using:  Beocat, Dropbox,
                and JupyterHub, with support for Globus and Google Drive coming soon.
              </p>
            </Card>
          </Col>

          <Col md={4}>
            <Card header={<h5 className="card-title">Link External Services</h5>} hr>

            </Card>
          </Col>
        </Row>

      </Grid>
    </div>
  </DefaultLayout>
);

export default Dashboard;
