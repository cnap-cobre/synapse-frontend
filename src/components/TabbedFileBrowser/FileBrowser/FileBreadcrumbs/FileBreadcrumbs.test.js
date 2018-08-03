import configureStore from 'redux-mock-store';
import FileBreadcrumbs from './FileBreadcrumbs';
import {Link} from 'redux-json-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';


const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/viper/home/k/kmdice/'
        }
      })}>
        <FileBreadcrumbs
          systemName="Viper"
          prefix="/files"
          pathname="/files/viper/home/k/kmdice/"
          crumbComponent={Link}
        />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});