import React from 'react';

import {UserProfileProvider} from "./UserProfileContext";
import {ModalStateProvider} from './ModalStateProvider';

export const GlobalContextWrapper = (props) => (
  <UserProfileProvider>
    <ModalStateProvider>
      {props.children}
    </ModalStateProvider>
  </UserProfileProvider>
);