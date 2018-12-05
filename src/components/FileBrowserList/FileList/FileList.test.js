import React from 'react';
import ReactDOM from 'react-dom';
import FileList from './FileList';


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <table>
      <FileList
        list={[]}
        path="/beocat/home/morty/"
        onSelectFile={() => (null)}
        showDotfiles={false}
        handleDoubleClick={() => {}}
        handleSingleClick={() => {}}
      />
    </table>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
