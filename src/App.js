import { connect } from 'react-redux';
import ContextMenu from './components/ContextMenu/ContextMenu';
import { actions as agaveFileSystemsActions } from './store/AgaveFileSystems';
import {fetchProfileIfNeeded} from "./store/userProfile/actions";
import ModalWrapper from './components/Modal/ModalWrapper';
import {Notify} from 'react-redux-notify';
import {putCSRFTokenInStore} from "./store/csrf/actions";
import React from "react";
import {Router} from 'redux-json-router';
import routes from './routes.json';
import 'react-redux-notify/dist/ReactReduxNotify.css';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchProfileIfNeeded());
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