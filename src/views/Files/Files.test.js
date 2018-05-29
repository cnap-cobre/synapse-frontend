import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import Files from './Files';
import ExampleFileListing from './ExampleFileListing.json'

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render(<MockRouter><Files/></MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});