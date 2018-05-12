import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import NavigationGroup from './NavigationGroup';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><NavigationGroup/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});