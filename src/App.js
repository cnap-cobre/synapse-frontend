import React, { Component } from "react";

import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';

import { ModalContext } from "./contexts/ModalStateProvider";
import EmptyWrapperForDrawingModals from './components/Modal/EmptyWrapperForDrawingModals';

export default class App extends Component {
  render() {
    return (
        <GlobalContextWrapper>

          {this.props.children}

          <ModalContext.Consumer>
            {context => (
                <EmptyWrapperForDrawingModals modalContext={context} />
            )}
          </ModalContext.Consumer>
        </GlobalContextWrapper>
    );
  }
}
