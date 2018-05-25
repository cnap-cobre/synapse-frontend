import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TabbedFileBrowser from "Components/TabbedFileBrowser/TabbedFileBrowser";

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
