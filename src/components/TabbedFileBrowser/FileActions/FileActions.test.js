import configureStore from 'redux-mock-store';
import FileActions from './FileActions';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore()}>
        <FileActions id={42}
                     path="/home/k/kmdice/cake.jpg"
                     file={{}}
                     fileName="cake.jpg"
        />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});