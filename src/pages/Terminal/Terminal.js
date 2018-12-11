// @flow

import React from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../physical_layout/Card'
import {getJupyterHubUsername} from "../../store/userProfile/reducer";

type Props = {
  jupyterUserName: string,
}

class Terminal extends React.Component<Props> {
  render() {
    const { jupyterUserName } = this.props;
    return (
      <DefaultLayout>
        <div className="content">
          <div className="container-fluid">
            <Card header={<h4 className="card-title">Launch a Terminal</h4>} hr>
              <p>
                To launch a JupyterHub terminal session, click the button below.  You will be prompted to spawn a
                JupyterHub server.  This may take some time dependening on the state of the Beocat queue.
              </p>

              <a href={`https://jupyterhub.beocat.ksu.edu/user/${jupyterUserName}/terminals/1`}
                 className="btn btn-danger btn-fill btn-wd"
                 target="_blank">
                Launch Terminal
              </a>
            </Card>
          </div>
        </div>
      </DefaultLayout>
    );
  }
}

const mapStateToProps = (store) => ({
  jupyterUserName: getJupyterHubUsername(store)
});

export default connect(
    mapStateToProps,
)(Terminal);