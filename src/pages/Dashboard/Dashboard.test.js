import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { initialUserProfileState } from "../../reducers/userProfile";

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
        <Dashboard/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});