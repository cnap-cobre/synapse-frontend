import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";

import DefaultSidebar from '../DefaultSidebar/DefaultSidebar';
import DefaultNavbar from '../DefaultNavbar/DefaultNavbar';
import DefaultFooter from '../DefaultFooter/DefaultFooter';
import routes from '../../routes';

export default class DefaultLayout extends Component {
  render() {
    return (
      <div className="wrapper">
        <DefaultSidebar/>

        <div className="main-panel">
          <DefaultNavbar/>

          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                <route.component {...props} />
              )} />)
              : (null);
              },
            )}
          </Switch>

          <DefaultFooter/>
        </div>
      </div>
    );
  }
}
