import React from 'react';
import ReactDOM from 'react-dom';
import DefaultLayout from './DefaultLayout';
import { Provider } from 'react-redux';
import { initialUserProfileState } from "../../reducers/userProfile";
import configureStore from 'redux-mock-store';

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