import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Dashboard from './Dashboard';
import { initialUserProfileState } from '../../store/userProfile/reducer';
import { initialVisualOptionsState } from '../../store/ui/visualOptions/reducer';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render((
    <Provider store={mockStore({
      userProfile: initialUserProfileState,
      router: {
        pathname: '/files/viper/home/kmdice/625/hw3/',
      },
      ui: {
        visualOptions: initialVisualOptionsState,
      },
    })}
    >
      <Dashboard />
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
