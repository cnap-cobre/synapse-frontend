import { connect } from 'react-redux';
import React from 'react';
import { Router } from 'redux-json-router';
import { actions as agaveFileSystemsActions } from './store/agaveFileSystems/AgaveFileSystems';
import ContextMenu from './components/ContextMenu/ContextMenu';
import ModalWrapper from './components/Modal/ModalWrapper';
import { putCSRFTokenInStore } from './store/csrf/Csrf';
import routes from './routes.jsonrt';
import { actions as userProfileActions } from './store/userProfile/UserProfile';
import Notifications from 'react-notification-system-redux';
import './scss/paper-dashboard.scss';
import './scss/social_login_buttons.scss';


class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(userProfileActions.pending());
    dispatch(agaveFileSystemsActions.pending());
    dispatch(putCSRFTokenInStore());
  }

  render() {
    const { notifications } = this.props;

    return (
      <div>
        <Router routes={routes} />
        <ModalWrapper />
        <Notifications notifications={notifications} />
        <ContextMenu />
      </div>
    );
  }
}

export default connect(
    state => ({ notifications: state.notifications })
)(App);
