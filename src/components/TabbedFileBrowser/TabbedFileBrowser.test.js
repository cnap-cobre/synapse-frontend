import configureStore from 'redux-mock-store';
import { initialFileSystemsState } from "../../reducers/fileSystems";
import { initialUserProfileState } from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import TabbedFileBrowser from './TabbedFileBrowser';


const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState,
        fileSystems: initialFileSystemsState,
        visualOptions: {
          showDotfiles: true
        },
        router: {
          pathname: '/files/beocat/',
        },
      })}>
        <TabbedFileBrowser prefix="/files" />
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});