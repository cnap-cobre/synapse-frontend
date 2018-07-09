import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialUserProfileState } from "../../reducers/userProfile";
import Shell from './Shell';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
        <Shell/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});