import Editor from './Editor';
import React from 'react';
import ReactDOM from 'react-dom';


it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Editor fontSize={20} width={"100%"} height={"40%"}/>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});