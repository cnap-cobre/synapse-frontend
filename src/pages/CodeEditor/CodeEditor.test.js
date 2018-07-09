import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import CodeEditor from './CodeEditor';
import { initialUserProfileState } from "../../reducers/userProfile";

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        userProfile: initialUserProfileState
      })}>
        <CodeEditor/>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});