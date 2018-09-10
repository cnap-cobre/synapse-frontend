import configureStore from 'redux-mock-store';
import ExampleFileListing from './ExampleFileListing.json'
import Files from './Files';
import {initialAgaveFileSystemsState} from "../../reducers/agaveFileSystems";
import {initialUserProfileState} from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';


const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/beocat/homes/kmdice/',
        },
        visualOptions: {
          showDotfiles: true
        },
        userProfile: initialUserProfileState,
        agaveFileSystems: initialAgaveFileSystemsState,
        focusedFile: {
          filePath: ''
        }
      })}>
        <Files/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});