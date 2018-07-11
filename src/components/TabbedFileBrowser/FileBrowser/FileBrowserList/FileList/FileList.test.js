import FileList from './FileList';
import React from 'react';
import ReactDOM from 'react-dom';


it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <table>
        <FileList
            list={[]}
            path="/beocat/home/morty/"
            onSelectFile={() => (null)}
            showDotfiles={false}
        />
      </table>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});