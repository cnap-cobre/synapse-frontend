import FileFieldHeader from './FileFieldHeader';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <table>
        <FileFieldHeader/>
      </table>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});