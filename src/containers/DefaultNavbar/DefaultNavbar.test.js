import React from 'react';
import ReactDOM from 'react-dom';
import DefaultNavbar from './DefaultNavbar';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<DefaultNavbar/>, div);
  ReactDOM.unmountComponentAtNode(div);
});