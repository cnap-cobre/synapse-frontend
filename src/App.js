import { connect } from 'react-redux';
import { Notify } from 'react-redux-notify';
import React from 'react';
import { Router } from 'redux-json-router';
import { actions as agaveFileSystemsActions } from './store/agaveFileSystems/AgaveFileSystems';
import ContextMenu from './components/ContextMenu/ContextMenu';
import ModalWrapper from './components/Modal/ModalWrapper';
import { putCSRFTokenInStore } from './store/csrf/Csrf';
import routes from './routes.json';
import { actions as userProfileActions } from './store/userProfile/UserProfile';
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
