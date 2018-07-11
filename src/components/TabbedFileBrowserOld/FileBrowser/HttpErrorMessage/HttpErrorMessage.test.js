import React from 'react';
import ReactDOM from 'react-dom';
import HttpErrorMessage from './HttpErrorMessage';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <HttpErrorMessage visible={true} errorObject={{
        message: "You done messed up A-A-RON!",
        status: 403
      }} />
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});