import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import NavigationLink from './NavigationLink';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={mockStore()}>
      <NavigationLink to="/cake/" activeOnlyWhenExact={true}/>
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});