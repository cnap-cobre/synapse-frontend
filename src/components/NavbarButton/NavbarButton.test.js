import React from 'react';
import ReactDOM from 'react-dom';
import NavbarButton from './NavbarButton';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<NavbarButton/>, div);
  ReactDOM.unmountComponentAtNode(div);
});