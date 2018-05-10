import React, { Component } from 'react';

export default class DefaultFooter extends Component {
  render() {
    return (
        <footer className="footer">
          <div className="container-fluid">
            <nav className="pull-left">
              <ul>
                <li>
                  <a href="#">
                    Footer Link 1
                  </a>
                </li>
                <li>
                  <a href="#">
                    Footer Link 2
                  </a>
                </li>
                <li>
                  <a href="#">
                    Footer Link 3
                  </a>
                </li>
              </ul>
            </nav>
            <div className="copyright pull-right">
              &copy;
              {new Date().getFullYear()} CNAP Center of Biomedical Research
            </div>
          </div>
        </footer>
    );
  }
}