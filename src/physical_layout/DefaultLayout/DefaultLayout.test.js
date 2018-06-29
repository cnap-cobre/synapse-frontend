import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import DefaultLayout from './DefaultLayout';
import {MockGlobalContextWrapper} from "../../contexts/MockGlobalContextWrapper";

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <MockGlobalContextWrapper>
        <MockRouter>
          <DefaultLayout/>
        </MockRouter>
      </MockGlobalContextWrapper>, div);
  ReactDOM.unmountComponentAtNode(div);
});