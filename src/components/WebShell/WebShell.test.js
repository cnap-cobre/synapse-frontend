import React from 'react';
import ReactDOM from 'react-dom';
import WebShell from './WebShell';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<WebShell/>, div);
  ReactDOM.unmountComponentAtNode(div);
});