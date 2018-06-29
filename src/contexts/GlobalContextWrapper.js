import React from 'react';

import {UserProfileProvider} from "./UserProfileContext";

export const GlobalContextWrapper = (props) => (
  <UserProfileProvider>
    {props.children}
  </UserProfileProvider>
);