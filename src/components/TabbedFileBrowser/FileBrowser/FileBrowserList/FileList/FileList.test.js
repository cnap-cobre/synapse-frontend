import FileList from './FileList';
import React from 'react';
import ReactDOM from 'react-dom';

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