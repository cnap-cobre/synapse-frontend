import React from 'react';
import ReactDOM from 'react-dom';
import {Route, MemoryRouter} from 'react-router-dom';
import FileList from './FileList';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <table>
        <FileList
            fileActionsService={{}}
        />
      </table>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});