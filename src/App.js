import { connect } from 'react-redux';
import {fetchAgaveFileSystemsIfNeeded} from "./actions/agaveFileSystems";
import {fetchProfileIfNeeded} from "./actions/userProfile";
import ModalWrapper from './components/Modal/ModalWrapper';
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
          <ModalWrapper />
        </div>
    );
  }
}

export default connect()(App);