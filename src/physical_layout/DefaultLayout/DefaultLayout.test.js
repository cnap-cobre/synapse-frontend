import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import DefaultLayout from './DefaultLayout';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><DefaultLayout/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});