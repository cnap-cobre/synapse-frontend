import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./physical_layout/DefaultLayout/DefaultLayout";

import { UserProfileProvider } from './contexts/UserProfileContext';

export default class App extends Component {
  render() {
    return (
        <UserProfileProvider>
          <BrowserRouter>
            <Switch>
              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </BrowserRouter>
        </UserProfileProvider>
    );
  }
}
