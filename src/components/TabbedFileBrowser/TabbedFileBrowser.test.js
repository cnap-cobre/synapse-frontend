import configureStore from 'redux-mock-store';
import {initialAgaveFileSystemsState} from "../../reducers/agaveFileSystems";
import { initialFileSystemsState } from "../../reducers/fileSystems";
import { initialUserProfileState } from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import TabbedFileBrowser from './TabbedFileBrowser';
import thunk from 'redux-thunk';


const mockStore = configureStore([thunk]);

it('renders without crashing', ()=>{
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
          pathname: '/files/browse/agave/beocat/homes/asdf/',
        },
        userProfile: initialUserProfileState,
        visualOptions: {
          showDotfiles: true
        },
      })}>
        <TabbedFileBrowser prefix="/files/browse" />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});