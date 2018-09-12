import Browse from './Browse';
import configureStore from 'redux-mock-store';
import ExampleFileListing from './ExampleFileListing.json'
import {initialFileSystemsState} from "../../../reducers/fileSystems";
import {initialUserProfileState} from "../../../reducers/userProfile";
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
        fileSystems: initialFileSystemsState,
        focusedFile: {
          filePath: ''
        }
      })}>
        <Browse/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});