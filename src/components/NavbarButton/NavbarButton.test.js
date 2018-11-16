import configureStore from 'redux-mock-store';
import {initialVisualOptionsState} from "../../store/private/visualOptions/reducer";
import NavbarButton from './NavbarButton';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

const mockStore = configureStore([]);

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <Provider store={mockStore({
        visualOptions: initialVisualOptionsState
      })}>
        <NavbarButton/>
      </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});