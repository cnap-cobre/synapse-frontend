import React from 'react';
import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import UserDetails from '../../components/UserDetails/UserDetails';
import UserProfilePhoto from '../../components/UserProfilePhoto/UserProfilePhoto';


const Account = () => (
  <CardLayout>
    <h3>My Account</h3>
    <UserProfilePhoto />
    <UserDetails />
  </CardLayout>
);

export default Account;
