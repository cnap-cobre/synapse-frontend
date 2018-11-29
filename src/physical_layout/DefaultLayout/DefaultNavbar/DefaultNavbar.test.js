import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { initialVisualOptionsState } from '../../../store/ui/visualOptions/reducer';
import DefaultNavbar from './DefaultNavbar';

const mockStore = configureStore([]);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={mockStore({
      ui: {
        visualOptions: initialVisualOptionsState,
      },
    })}
    >
      <DefaultNavbar />
    </Provider>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
