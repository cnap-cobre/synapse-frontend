import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter} from 'react-router-dom';
import Files from './Files';
import ExampleFileListing from './ExampleFileListing.json'
import {MockGlobalContextWrapper} from "../../contexts/MockGlobalContextWrapper";

it('renders without crashing', ()=>{
  fetch.mockResponseOnce(JSON.stringify(ExampleFileListing), {status: 200});

  const div = document.createElement('div');
  ReactDOM.render((
      <MockGlobalContextWrapper>
        <MemoryRouter initialEntries={[
                        '/',
                        '/files/beocat/',
                        '/files/beocat/625/',
                        '/files/beocat/625/hw3/',
                        '/files/beocat/625/hw3/output/'
                      ]}
                      initialIndex={4}>
          <Files/>
        </MemoryRouter>
      </MockGlobalContextWrapper>
      ), div);
  ReactDOM.unmountComponentAtNode(div);
});