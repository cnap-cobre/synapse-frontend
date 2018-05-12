import React from 'react';
import ReactDOM from 'react-dom';
import UserDropdown from './UserDropdown';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<UserDropdown/>, div);
  ReactDOM.unmountComponentAtNode(div);
});