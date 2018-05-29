import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import { instanceOf } from 'prop-types';

import LogoutButton from '../../../components/LogoutButton/LogoutButton';

class Logout extends Component {
  render() {
    return (
        <div className="content">
          <div className="container-fluid">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Sign Out</h2>

              </div>
              <div className="card-content">
                <p>Are you sure you want to sign out?</p>

                <CookiesProvider>
                  <LogoutButton/>
                </CookiesProvider>


              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Logout;