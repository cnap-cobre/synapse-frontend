import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import FileBreadcrumbs from './FileBreadcrumbs';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <MemoryRouter
        initialEntries={[
          '/',
          '/files/',
          '/files/625/',
          '/files/625/hw3/',
          '/files/625/hw3/output/'
        ]}
        initialIndex={4}
      >
        <Route render={({history}) => (
          <FileBreadcrumbs
            history={history}
            prefix="/files"
            systemDisplayName="Viper"
          />
        )} />
      </MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});