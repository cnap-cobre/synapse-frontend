import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TabbedFileBrowser from "Components/TabbedFileBrowser/TabbedFileBrowser";
import AgaveBrowser from "Components/AgaveBrowser/AgaveBrowser";

export default class Files extends Component {
  render() {
    return (
        <Route render={({history}) => (
            <div className="content">
              <div className="container-fluid">
                <div className="card">
                  <div className="card-content">
                    <TabbedFileBrowser history={history}/>
                  </div>
                </div>
              </div>
            </div>
        )} />
    );
  }
}
