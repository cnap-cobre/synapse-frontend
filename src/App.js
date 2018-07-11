import { connect } from 'react-redux';
import EmptyWrapperForDrawingModals from './components/Modal/EmptyWrapperForDrawingModals';
import {fetchAgaveFileSystemsIfNeeded} from "./actions/agaveFileSystems";
import {fetchProfileIfNeeded} from "./actions/userProfile";
import NewModalWrapper from './components/Modal/NewModalWrapper';
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
        <div>
          {this.props.children}
          <NewModalWrapper />
        </div>
    );
  }
}

export default connect()(App);