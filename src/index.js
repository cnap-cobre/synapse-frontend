import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch } from "react-router-dom";
import App from './App';

ReactDOM.render((
  <HashRouter>
    <App />
  </HashRouter>
), document.getElementById("root"));