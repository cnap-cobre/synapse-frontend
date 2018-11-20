import Browse from './Browse';
import configureStore from 'redux-mock-store';
import ExampleFileListing from './ExampleFileListing.json'
import {initialAgaveFileSystemsState} from "../../../store/agaveFileSystems/reducer";
import {initialFileSystemsState} from "../../../store/fileSystems/reducer";
import {initialUserProfileState} from "../../../store/userProfile/reducer";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';


const mockStore = configureStore([thunk]);

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        agaveFileSystems: initialAgaveFileSystemsState,
        fileSystems: initialFileSystemsState,
        files: {
          "/agave/beocat/homes/asdf/": {
            isFetching: false,
            didInvalidate: false,
            files: [],
            hasFetched: true,
            lastUpdated: 1539634558426,
            symlinkCorrectionStarted: false
          }
        },
        router: {
          pathname: '/files/beocat/homes/kmdice/',
        },
        userProfile: initialUserProfileState,
        ui: {
          focusedFiles: {
            list: []
          },
          visualOptions: {
            showDotfiles: true
          },
        }
      })}>
        <Browse/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});