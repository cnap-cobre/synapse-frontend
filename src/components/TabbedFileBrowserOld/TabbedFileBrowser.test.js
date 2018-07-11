import React from 'react';
import ReactDOM from 'react-dom';
import TabbedFileBrowser from './TabbedFileBrowser';
import { Provider } from 'react-redux';
import { initialUserProfileState } from "../../reducers/userProfile";
import { initialAgaveFileSystemsState } from "../../reducers/agaveFileSystems";
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState,
        agaveFileSystems: initialAgaveFileSystemsState,
        router: {
          pathname: '/files/beocat/',
        },
      })}>
        <TabbedFileBrowser/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});