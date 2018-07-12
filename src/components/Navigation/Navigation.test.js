import configureStore from 'redux-mock-store';
import Navigation from './Navigation';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/viper/home/kmdice/625/hw3/'
        }
      })}>
        <Navigation/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});