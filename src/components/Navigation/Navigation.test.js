import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import Navigation from './Navigation';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><Navigation/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});