import configureStore from 'redux-mock-store';
import DefaultLayout from './DefaultLayout';
import { initialUserProfileState } from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
        <DefaultLayout/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});