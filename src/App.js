import { connect } from 'react-redux';
import EmptyWrapperForDrawingModals from './components/Modal/EmptyWrapperForDrawingModals';
import {fetchAgaveFileSystemsIfNeeded} from "./actions/agaveFileSystems";
import {fetchProfileIfNeeded} from "./actions/userProfile";
import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';
import { ModalContext } from "./contexts/ModalStateProvider";
import {putCSRFTokenInStore} from "./actions/csrf";
import React from "react";


class App extends React.Component {
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