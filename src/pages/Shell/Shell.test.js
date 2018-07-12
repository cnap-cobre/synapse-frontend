import configureStore from 'redux-mock-store';
import { initialUserProfileState } from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './Shell';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState,
        router: {
          pathname: '/files/viper/home/kmdice/625/hw3'
        }
      })}>
        <Shell/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});