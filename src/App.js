import React, { Component } from "react";
import { connect } from 'react-redux';

import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';

import { ModalContext } from "./contexts/ModalStateProvider";
import EmptyWrapperForDrawingModals from './components/Modal/EmptyWrapperForDrawingModals';
import {fetchProfileIfNeeded} from "./actions/userProfile";
import {fetchAgaveFileSystemsIfNeeded} from "./actions/agaveFileSystems";
import {putCSRFTokenInStore} from "./actions/csrf";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProfileIfNeeded());
    dispatch(fetchAgaveFileSystemsIfNeeded());
    dispatch(putCSRFTokenInStore());
  }

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

export default connect()(App);