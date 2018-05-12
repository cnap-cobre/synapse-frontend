import React from 'react';
import ReactDOM from 'react-dom';
import Files from './Files';
import ExampleFileListing from './ExampleFileListing.json'

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing));

  const div = document.createElement('div');
  ReactDOM.render(<Files/>, div);
  ReactDOM.unmountComponentAtNode(div);
});