import React from 'react';
import ReactDOM from 'react-dom';
import CodeEditor from './CodeEditor';
import MockRouter from 'react-mock-router';
import {MockGlobalContextWrapper} from "../../contexts/MockGlobalContextWrapper";

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <MockGlobalContextWrapper>
        <MockRouter>
          <CodeEditor/>
        </MockRouter>
      </MockGlobalContextWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});