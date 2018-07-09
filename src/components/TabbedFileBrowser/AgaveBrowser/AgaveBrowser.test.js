import React from 'react';
import ReactDOM from 'react-dom';
import AgaveBrowser from "./AgaveBrowser";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { CookiesProvider } from 'react-cookie';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/beocat/homes/kmdice/'
        }
      })}>
        <CookiesProvider>
          <AgaveBrowser prefix={'/files/beocat'}
                        system={'beocat'}
                        systemDisplayName={'Beocat'} />
        </CookiesProvider>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});