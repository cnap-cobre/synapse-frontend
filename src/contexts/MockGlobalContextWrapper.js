import React from 'react';
import { UserProfileContext, UserProfileDefaults } from './UserProfileContext';

export const MockGlobalContextWrapper = (props) => (
  <UserProfileContext.Provider value={{profile: UserProfileDefaults}}>
    {props.children}
  </UserProfileContext.Provider>
);