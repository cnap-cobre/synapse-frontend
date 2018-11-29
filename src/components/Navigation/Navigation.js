// @flow

import React from 'react';
import nav from '../../nav.js';
import NavigationGroup from './NavigationGroup/NavigationGroup';
import NavigationLink from './NavigationLink/NavigationLink';
import type { NavigationType } from '../../nav';

export default class Navigation extends React.Component<void> {
  static propTypes = {};

  static buildLinks = (item: NavigationType) => {
    if (item.children !== undefined) {
      return (
        <NavigationGroup
          to={item.url}
          key={item.url}
          icon={item.icon}
          label={item.name}
          activeOnlyWhenExact={item.exact}
        >
          {item.children.map(Navigation.buildLinks)}
        </NavigationGroup>
      );
    } if (item.hasOwnProperty('icon')) {
      return (
        <NavigationLink
          to={item.url}
          key={item.url}
          activeOnlyWhenExact={item.exact}
        >
          <i className={item.icon} />
          <p>
            {item.name}
            {item.beta ? (
              <small>&nbsp; (beta)</small>
            ) : (null)}
          </p>
        </NavigationLink>
      );
    }
    return (
      <NavigationLink
        to={item.url}
        key={item.url}
        activeOnlyWhenExact={item.exact}
      >
        <span className="sidebar-mini">{item.mini}</span>
        <span className="sidebar-normal">{item.name}</span>
      </NavigationLink>
    );
  };

  render() {
    return (
      <ul className="nav">
        {nav.map(Navigation.buildLinks)}
      </ul>
    );
  }
}
