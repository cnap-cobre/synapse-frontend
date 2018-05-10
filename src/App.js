import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import AgaveBrowser from "Components/AgaveBrowser";
import WebShell from "Components/WebShell";
import Dashboard from "Components/Dashboard";
import CodeEditor from "Components/CodeEditor";

export default class App extends Component {
  render() {
    return (
        <HashRouter>
          <Switch>
            <Route path="/" component={Dashboard}/>
            <Route path="/files" component={AgaveBrowser}/>
            <Route path="/shell" component={WebShell}/>
            <Route path="/editor" component={CodeEditor}/>
          </Switch>
        </HashRouter>
    );
  }
}
