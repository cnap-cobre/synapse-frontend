import { actions as agaveFileSystemsActions } from './store/AgaveFileSystems';
import { connect } from 'react-redux';
import ContextMenu from './components/ContextMenu/ContextMenu';
import ModalWrapper from './components/Modal/ModalWrapper';
import {Notify} from 'react-redux-notify';
import {putCSRFTokenInStore} from "./store/Csrf";
import React from "react";
import {Router} from 'redux-json-router';
import routes from './routes.json';
import { actions as userProfileActions } from './store/UserProfile';
import 'react-redux-notify/dist/ReactReduxNotify.css';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userProfileActions.pending());
    dispatch(agaveFileSystemsActions.pending());
    dispatch(putCSRFTokenInStore());
  }

  render() {
    return (
        <div>
          <Router routes={routes} />
          <ModalWrapper />
          <Notify />
          <ContextMenu />
        </div>
    );
  }
}

export default connect()(App);