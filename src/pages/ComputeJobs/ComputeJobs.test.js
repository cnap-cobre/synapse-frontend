import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { initialVisualOptionsState } from '../../store/ui/visualOptions/reducer';
import { initialUserProfileState } from '../../store/userProfile/reducer';
import ComputeJobs from './ComputeJobs';

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
      <ComputeJobs />
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
