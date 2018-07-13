import configureStore from 'redux-mock-store';
import DefaultNavbar from './DefaultNavbar';
import {initialVisualOptionsState} from "../../../reducers/visualOptions";
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={mockStore({
        visualOptions: initialVisualOptionsState
      })}>
        <DefaultNavbar/>
      </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});