import React from 'react';
import ReactDOM from 'react-dom';
import ComputeJobs from './ComputeJobs';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<ComputeJobs/>, div);
  ReactDOM.unmountComponentAtNode(div);
});