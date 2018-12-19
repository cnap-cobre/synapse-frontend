// @flow

import React from 'react';
import { connect } from 'react-redux';
import {
  Grid, Row, Col, Alert,
} from 'react-bootstrap';
import Card from '../../physical_layout/Card';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import {
  JupyterHubSignInButton,
  DropboxSignInButton,
  AgaveSignInButton,
} from '../../components/SocialButtons/SocialSignInButton';
import LinkBeocatButton from '../../components/SocialButtons/LinkBeocatButton/LinkBeocatButton';
import { getExternalAccounts } from '../../store/userProfile/reducer';
import { getBeocatConnected } from '../../store/agaveFileSystems/reducer';

type Props = {
  externalAccounts: {
    dropbox: boolean,
    agave: boolean,
    globus: boolean,
    jupyter: boolean,
  },
  beocatConnected: boolean,
}

const Dashboard = (props: Props) => {
  const { externalAccounts, beocatConnected } = props;
  return (
    <DefaultLayout>
      <div className="content">
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <Card header={<h3 className="card-title">About</h3>} hr>
                <Row>
                  <Col xs={12}>
                    <p>
                      Synapse is an open science gateway for the psychological sciences,
                      tying together tools, applications, and data in support of the
                      research process.  The goal of the Synapse platform is to make openness
                      and reproducibility an effortless part of the research process.
                    </p>
                    <p>
                      Synapse is supported by the Cognitive and Neurobiological Approaches to
                      Plasticity (CNAP) Center of Biomedical Research Excellence (COBRE) of
                      the National Institutes of Health under grant number P20GM113109.
                    </p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col lg={6} md={12}>
              <Card
                header={(
                      <>
                        <h4 className="card-title">Third-Party Services</h4>
                        <p className="category">Integrated with tools you already use.</p>
                      </>
                  )}
                hr
              >
                <img
                  src="/img/service-diagram.png"
                  alt="Synapse integration diagram"
                  className="img-responseive center-block"
                />
                <p>
                  Rather than attempt to be a monolithic solution, Synapse integrates with
                  several 3rd party services which you may already be using:
                  Beocat, Dropbox, and JupyterHub, with support for Globus and Google Drive
                  coming soon.
                </p>
                <Alert bsStyle="success">
                  <a href="/accounts/social/connections/">Click Here</a>
                  &nbsp;
                  to connect your external accounts.
                </Alert>
                <p />
              </Card>
            </Col>

            <Col md={6}>
              <Card header={<h5 className="card-title">Getting Started</h5>} hr>
                <h6>1. Link JupyterHub</h6>
                <p>
                  Use your K-State EID and password to connect your JupyterHub account.
                  You must first have a Beocat account.  Sign up for one&nbsp;
                  <a href="https://account.beocat.ksu.edu/">here</a>
                  .
                </p>
                {externalAccounts.jupyter ? (
                    <>
                      <i className="ti-check-box" />
                      &nbsp;
                      JupyterHub account linked
                    </>
                ) : (
                  <JupyterHubSignInButton next="/" action="connect" />
                )}
                <hr />
                <h6>2. Link your Agave account</h6>
                <p>
                  Agave is the service on which Cyverse and many other open science gateways
                  are built.  We use Agave to power parts of Synapse&apos;s file transfer,
                  metadata, and history functions.
                </p>
                <p>
                  First, you will need to sign up for a TACC account at:&nbsp;
                  <a href="https://portal.tacc.utexas.edu/account-request">
                    https://portal.tacc.utexas.edu/account-request
                  </a>
                </p>
                <p>Next, use your TACC username and password to link your Agave account:</p>
                {externalAccounts.agave ? (
                    <>
                      <i className="ti-check-box" />
                      &nbsp;
                      Agave account linked
                    </>
                ) : (
                  <AgaveSignInButton next="/" action="connect" />
                )}
                <hr />

                <h6>3. Connect Beocat as an Agave-Provided File System</h6>
                <p>
                  To interact with your files on Beocat, you will need to add Beocat
                  to Agave as a File System provider.  Because this process involves
                  the exchange of cryptographic SSH keys, we&apos;ve written a script
                  to make it easier.
                </p>
                {beocatConnected ? (
                    <>
                      <i className="ti-check-box" />
                      &nbsp;
                      Beocat linked
                    </>
                ) : (
                  <LinkBeocatButton />
                )}
                <hr />

                <h6>Connect Dropbox (optional)</h6>
                <p>
                  To transfer files between Dropbox and other systems such as Beocat,
                  you will need to link your Dropbox account:
                </p>
                {externalAccounts.dropbox ? (
                    <>
                      <i className="ti-check-box" />
                      &nbsp;
                      Dropbox account linked
                    </>
                ) : (
                  <DropboxSignInButton next="/" action="connect" />
                )}
              </Card>
            </Col>
            <Col md={6}>
              <Card header={<h5 className="card-title">Features</h5>} hr>
                <h6>Currently Available:</h6>
                <ul>
                  <li>
                      File management on Dropbox, Beocat, or any SFTP server
                      to which you have access
                  </li>
                  <li>Transfer between arbitrary file systems</li>
                  <li>File history to track data from collection to analysis</li>
                </ul>

                <h6>Coming Soon:</h6>
                <ul>
                  <li>
                        Metadata management - Tag your data with metadata fields to track
                        provenance throughout the research process.
                  </li>
                  <li>
                        Globus integration - Copy files between your personal computer and
                        Beocat instantly, all from a web interface.
                  </li>
                  <li>
                        Automated file transfer backups - Configure daily or weekly transfers
                        to make your data available to collaborators
                  </li>
                  <li>
                        Data publication - Truly open data, for the world to access
                  </li>
                  <li>
                    GitLab integration - Colaboratively edit codes
                  </li>
                </ul>
              </Card>
            </Col>
            <Col md={6}>
              <Card header={<h4 className="card-title">Get Support</h4>} hr>
                <p>
                    Support requests can be directed to&nbsp;
                  <a href="mailto:cnap-ni@cs.ksu.edu">cnap-ni@cs.ksu.edu</a>
                    .
                </p>
                <p>
                  Let us know what technology challenges you face in your day
                  to day research process.
                  Chances are, we can help.
                </p>
              </Card>
            </Col>
          </Row>

        </Grid>
      </div>
    </DefaultLayout>
  );
};

const mapStateToProps = store => ({
  externalAccounts: getExternalAccounts(store),
  beocatConnected: getBeocatConnected(store),
});

export default connect(
  mapStateToProps,
)(Dashboard);
