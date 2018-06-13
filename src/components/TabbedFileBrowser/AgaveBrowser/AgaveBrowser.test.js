import React from 'react';
import ReactDOM from 'react-dom';
import {MemoryRouter, Route} from 'react-router-dom';
import AgaveBrowser from "./AgaveBrowser";
import { CookiesProvider } from 'react-cookie';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <MemoryRouter
          initialEntries={[
            '/',
            '/files/beocat/',
            '/files/beocat/625/',
            '/files/beocat/625/hw3/',
            '/files/beocat/625/hw3/output/'
          ]}
          initialIndex={4}
      >
        <Route render={({history}) => (
            <CookiesProvider>
              <AgaveBrowser history={history}
                            prefix={'/files/beocat'}
                            system={'beocat'}
                            systemDisplayName={'Beocat'} />
            </CookiesProvider>
        )} />
      </MemoryRouter>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});