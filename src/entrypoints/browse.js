import AgaveBrowser from "Components/AgaveBrowser/AgaveBrowser";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Route } from "react-router-dom";

ReactDOM.render((
  <Router>
    <Route path="/" component={AgaveBrowser}/>
  </Router>
), document.getElementById("root"));