import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import { instanceOf } from 'prop-types';
import LogoutButton from './LogoutButton';
import ReactDOM from "react-dom";

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render(<CookiesProvider><LogoutButton/></CookiesProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});