import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import React from 'react';
import UserProfilePhoto from '../../components/UserProfilePhoto/UserProfilePhoto';

export default class Account extends React.Component {
  render() {
    return (
        <CardLayout>
          <h3>My Account</h3>
          <UserProfilePhoto/>
        </CardLayout>
    );
  }
}