import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import UserDropdown from './UserDropdown';

const mockStore = configureStore([]);
const storeData = {
  userProfile: {
    user: {
      full_name: 'asdfasdf asdfasdf'
    },
    gravatar: {
      url: 'http://asdfasdfasdf.com/'
    }
  }
};

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={mockStore(storeData)}>
      <UserDropdown />
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});