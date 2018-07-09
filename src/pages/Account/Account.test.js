import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { initialUserProfileState } from "../../reducers/userProfile";
import Account from './Account';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
        <Account/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});