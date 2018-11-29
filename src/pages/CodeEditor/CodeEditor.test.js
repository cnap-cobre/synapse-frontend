import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { initialVisualOptionsState } from '../../store/ui/visualOptions/reducer';
import { initialUserProfileState } from '../../store/userProfile/reducer';
import CodeEditor from './CodeEditor';

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
      <CodeEditor />
    </Provider>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});
