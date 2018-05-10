import React, { Component } from 'react';
import AgaveBrowser from "Components/AgaveBrowser/AgaveBrowser";

export default class Files extends Component {
  render() {
    return (
        <div className="card">
          <div className="card-content">
            <AgaveBrowser/>
          </div>
        </div>
    );
  }
}
