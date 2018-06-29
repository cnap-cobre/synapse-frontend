import React from 'react';
import ReactDOM from 'react-dom';
import MockRouter from 'react-mock-router';
import UserDropdown from './UserDropdown';

import {UserProfileDefaults} from '../../contexts/UserProfileContext';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(
      <MockRouter>
        <UserDropdown userProfile={UserProfileDefaults} />
      </MockRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});