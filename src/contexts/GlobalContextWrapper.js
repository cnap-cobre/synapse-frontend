import React from 'react';

import {ModalStateProvider} from './ModalStateProvider';

export const GlobalContextWrapper = (props) => (
    <ModalStateProvider>
      {props.children}
    </ModalStateProvider>
);