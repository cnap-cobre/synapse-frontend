import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./physical_layout/DefaultLayout/DefaultLayout";

import routes from './routes';

import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';

export default class App extends Component {
  render() {
    return (
        <GlobalContextWrapper>
          <BrowserRouter>
            <Switch>
              {routes.map((route, idx) => {
                return route.component ? (
                    <Route key={idx}
                           path={route.path}
                           exact={route.exact}
                           name={route.name}
                           render={props => (
                               <route.component {...props} />
                           )} />
                ) : (null);
              })}


              <Route path="/" name="Home" component={DefaultLayout} />
            </Switch>
          </BrowserRouter>
        </GlobalContextWrapper>
    );
  }
}
