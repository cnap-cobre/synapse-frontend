// @flow

import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../physical_layout/Card';
import { getJupyterHubUsername } from '../../store/userProfile/reducer';

type Props = {
  jupyterUserName: string,
}

const Terminal = (props: Props) => {
  const { jupyterUserName } = props;
  return (
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

                <a
                  href={`https://jupyterhub.beocat.ksu.edu/user/${jupyterUserName}/terminals/1`}
                  className="btn btn-danger btn-fill btn-wd"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                Launch Terminal
                </a>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    </DefaultLayout>
  );
};

const mapStateToProps = store => ({
  jupyterUserName: getJupyterHubUsername(store),
});

export default connect(
  mapStateToProps,
)(Terminal);
