import React from 'react';
import ReactDOM from 'react-dom';
import FileBreadcrumbs from './FileBreadcrumbs';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

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
            prefix="/files"
            systemDisplayName="Viper"
          />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});