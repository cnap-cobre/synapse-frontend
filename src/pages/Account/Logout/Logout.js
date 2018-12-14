import React from 'react';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import LogoutButton from '../../../components/LogoutButton/LogoutButton';


const Logout = () => (
  <DefaultLayout>
    <div className="content">
      <div className="container-fluid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Sign Out</h2>

          </div>
          <div className="card-content">
            <p>Are you sure you want to sign out?</p>

            <LogoutButton />

          </div>
        </div>
      </div>
    </div>
  </DefaultLayout>
);

export default Logout;
