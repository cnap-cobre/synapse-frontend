import React from 'react';
import ReactDOM from 'react-dom';
import ComputeJobs from './ComputeJobs';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { initialUserProfileState } from "../../reducers/userProfile";

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
      <ComputeJobs/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});