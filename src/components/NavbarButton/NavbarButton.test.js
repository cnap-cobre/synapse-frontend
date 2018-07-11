import NavbarButton from './NavbarButton';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<NavbarButton/>, div);
  ReactDOM.unmountComponentAtNode(div);
});