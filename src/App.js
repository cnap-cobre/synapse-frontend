import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./physical_layout/DefaultLayout/DefaultLayout";

export default class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/" name="Home" component={DefaultLayout} />
          </Switch>
        </BrowserRouter>
    );
  }
}
