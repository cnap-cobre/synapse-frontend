import React, { Component } from 'react';
import powercat from './ksu-logo.svg';

export default function Logo() {
    return (
        <div className="logo">
          <a href="/" className="simple-text logo-mini">
            <img src={powercat} alt="Powercat Logo" height="30"/>
          </a>

          <a href="/" className="simple-text logo-normal">
            <img src={powercat} alt="Powercat Logo" height="30"/>
            &nbsp;&nbsp;Synapse
          </a>
        </div>
    );
}