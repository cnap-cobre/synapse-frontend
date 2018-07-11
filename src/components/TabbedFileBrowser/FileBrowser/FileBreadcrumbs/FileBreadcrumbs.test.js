import configureStore from 'redux-mock-store';
import FileBreadcrumbs from './FileBreadcrumbs';
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
            prefix="/files"
            pathname="/files/viper/home/k/kmdice/"
            system={{
              id: 'viper',
              provider: 'agave',
              description: 'asdf',
              name: 'Viper',
              status: 'UP',
              type: 'STORAGE'
            }}
          />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});