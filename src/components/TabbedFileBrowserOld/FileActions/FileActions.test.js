import FileActions from './FileActions';
import React from 'react';
import ReactDOM from 'react-dom';


it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <FileActions id={42}
                   file={{
                     format: 'raw',
                     name: 'asdf.jpg',
                     path: '/homes/kmdice/asdf.jpg',
                     type: 'file'
                   }}
                   fileActionsService={{
                     list: () => {console.log('list')},
                     share: () => {console.log('share')},
                     wget: () => {console.log('wget')},
                     rename: () => {console.log('rename')},
                     mv: () => {console.log('mv')},
                     cp: () => {console.log('cp')},
                     rm: () => {console.log('rm')}
                   }}
      />
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});