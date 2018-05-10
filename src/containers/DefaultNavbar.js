import React, { Component } from 'react';

export default class DefaultNavbar extends Component {
  render() {
    return (
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-minimize">
              <button id="minimizeSidebar" className="btn btn-fill btn-icon"><i className="ti-more-alt"></i></button>
            </div>
            <div className="navbar-header">
              <button type="button" className="navbar-toggle" data-toggle="collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#sweetalert">Sweet Alert</a>
            </div>
            <div className="collapse navbar-collapse">
              <form className="navbar-form navbar-left navbar-search-form" role="search">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-search"></i></span>
                  <input type="text" value="" className="form-control" placeholder="Search..."/>
                </div>
              </form>
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#stats" className="dropdown-toggle btn-magnify" data-toggle="dropdown">
                    <i className="ti-panel"></i>
                    <p>Stats</p>
                  </a>
                </li>
                <li className="dropdown">
                  <a href="#notifications" className="dropdown-toggle btn-rotate" data-toggle="dropdown">
                    <i className="ti-bell"></i>
                    <span className="notification">5</span>
                    <p className="hidden-md hidden-lg">
                      Notifications
                      <b className="caret"></b>
                    </p>
                  </a>
                  <ul className="dropdown-menu">
                    <li><a href="#not1">Notification 1</a></li>
                    <li><a href="#not2">Notification 2</a></li>
                    <li><a href="#not3">Notification 3</a></li>
                    <li><a href="#not4">Notification 4</a></li>
                    <li><a href="#another">Another notification</a></li>
                  </ul>
                </li>
                <li>
                  <a href="#settings" className="btn-rotate">
                    <i className="ti-settings"></i>
                    <p className="hidden-md hidden-lg">
                      Settings
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}