import synapse_logo from './logo.png';
import React, { Component } from 'react';

export default function Logo() {
    return (
        <div className="logo">
          <a href="/" className="simple-text logo-mini">
            <img src={synapse_logo} alt="Synapse Logo" height="30"/>
          </a>

          <a href="/" className="simple-text logo-normal">
            <img src={synapse_logo} alt="Synapse Logo" height="30"/>
            &nbsp;&nbsp;Synapse
          </a>
        </div>
    );
}
