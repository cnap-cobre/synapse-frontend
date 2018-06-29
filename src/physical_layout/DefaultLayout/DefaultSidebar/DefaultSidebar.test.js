import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import DefaultSidebar from './DefaultSidebar';
import {MockGlobalContextWrapper} from "../../../contexts/MockGlobalContextWrapper";

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <MockGlobalContextWrapper>
        <MockRouter>
          <DefaultSidebar/>
        </MockRouter>
      </MockGlobalContextWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});