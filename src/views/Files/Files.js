import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import AgaveBrowser from "Components/AgaveBrowser/AgaveBrowser";

export default class Files extends Component {
  render() {
    return (
        <Route render={({history}) => (
            <div className="content">
              <div className="container-fluid">
                <div className="card">
                  <div className="card-content">
                    <AgaveBrowser history={history}
                                  prefix="/files"
                                  system="beocat"
                                  systemDisplayName="Beocat" />
                  </div>
                </div>
              </div>
            </div>
        )} />
    );
  }
}
