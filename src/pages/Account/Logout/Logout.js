import { CookiesProvider } from 'react-cookie';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import { instanceOf } from 'prop-types';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';
import React from 'react';


class Logout extends React.Component {
  render() {
    return (
        <DefaultLayout>
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
        </DefaultLayout>
    );
  }
}

export default Logout;