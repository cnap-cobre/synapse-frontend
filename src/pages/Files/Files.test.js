import React from 'react';
import ReactDOM from 'react-dom';
import Files from './Files';
import ExampleFileListing from './ExampleFileListing.json'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {initialUserProfileState} from "../../reducers/userProfile";
import {initialAgaveFileSystemsState} from "../../reducers/agaveFileSystems";

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/beocat/homes/kmdice/',
        },
        userProfile: initialUserProfileState,
        agaveFileSystems: initialAgaveFileSystemsState,
      })}>
        <Files/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});