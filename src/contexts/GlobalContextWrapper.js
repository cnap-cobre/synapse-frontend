import {ModalStateProvider} from './ModalStateProvider';
import React from 'react';

export const GlobalContextWrapper = (props) => (
    <ModalStateProvider>
      {props.children}
    </ModalStateProvider>
);