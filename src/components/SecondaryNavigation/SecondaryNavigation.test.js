import React from 'react';
import ReactDOM from 'react-dom';
import SecondaryNavigation from './SecondaryNavigation';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<SecondaryNavigation/>, div);
  ReactDOM.unmountComponentAtNode(div);
});