import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./containers/DefaultLayout";

export default class App extends Component {
  render() {
    return (
        <Switch>
          <Route path="/" name="Home" component={DefaultLayout} />
        </Switch>
    );
  }
}
