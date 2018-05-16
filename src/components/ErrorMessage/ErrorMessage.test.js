import React from 'react';
import ReactDOM from 'react-dom';
import ErrorMessage from './ErrorMessage';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <ErrorMessage visible={true} message="You done messed up A-A-RON!"/>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});