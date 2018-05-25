import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import Files from './Files';
import ExampleFileListing from './ExampleFileListing.json'

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Files/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});