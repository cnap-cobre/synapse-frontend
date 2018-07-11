import CodeEditor from './CodeEditor';
import configureStore from 'redux-mock-store';
import { initialUserProfileState } from "../../reducers/userProfile";
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

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