import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore()}>
        <Navigation/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});