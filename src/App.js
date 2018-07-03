import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DefaultLayout from "./physical_layout/DefaultLayout/DefaultLayout";

import routes from './routes';

import { GlobalContextWrapper } from './contexts/GlobalContextWrapper';

import { ModalContext } from "./contexts/ModalStateProvider";
import EmptyWrapperForDrawingModals from './components/Modal/EmptyWrapperForDrawingModals';

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

          <ModalContext.Consumer>
            {context => (
                <EmptyWrapperForDrawingModals modalContext={context} />
            )}
          </ModalContext.Consumer>
        </GlobalContextWrapper>
    );
  }
}
