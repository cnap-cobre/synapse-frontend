import React, { Component } from 'react';

export default function NavbarButton() {
    return (
        <button type="button" className="navbar-toggle" data-toggle="collapse">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
    );
}