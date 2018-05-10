import React, { Component } from 'react';
import AgaveBroser from 'Components/AgaveBrowser';
import AgaveBrowser from "../components/AgaveBrowser";

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
