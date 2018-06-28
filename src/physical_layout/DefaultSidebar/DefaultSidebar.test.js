import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import DefaultSidebar from './DefaultSidebar';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><DefaultSidebar/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});