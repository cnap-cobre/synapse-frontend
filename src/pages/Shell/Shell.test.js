import React from 'react';
import ReactDOM from 'react-dom';
import Shell from './Shell';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<Shell/>, div);
  ReactDOM.unmountComponentAtNode(div);
});