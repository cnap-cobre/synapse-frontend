import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import UserDropdown from './UserDropdown';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><UserDropdown/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});