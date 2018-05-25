import React from 'react';
import ReactDOM from 'react-dom';
import FileActions from './FileActions';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<FileActions id={42}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});