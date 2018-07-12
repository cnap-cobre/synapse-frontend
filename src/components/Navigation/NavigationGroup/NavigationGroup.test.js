import configureStore from 'redux-mock-store';
import NavigationGroup from './NavigationGroup';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
      <Provider store={mockStore({
        router: {
          pathname: '/files/viper/home/kmdice/625/hw3/'
        }
      })}>
        <NavigationGroup
          to="/cake"
          activeOnlyWhenExact={true}
          icon="ti-calendar"
          label="Cake"
        >
          <span>Cake</span>
        </NavigationGroup>
      </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});