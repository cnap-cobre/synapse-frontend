import React, {Component} from 'react';
import NavigationLink from './NavigationLink/NavigationLink';
import NavigationGroup from './NavigationGroup/NavigationGroup';
import nav from '../../nav.js';

export default class Navigation extends Component {
  static propTypes = {};

  static buildLinks = (item) => {
    if (item.hasOwnProperty('children')) {
      return(
          <NavigationGroup to={item.url}
                           key={item.url}
                           icon={item.icon}
                           label={item.name}
                           activeOnlyWhenExact={item.exact}>
            {item.children.map(Navigation.buildLinks)}
          </NavigationGroup>
      );
    } else if (item.hasOwnProperty('icon')) {
      return (
          <NavigationLink to={item.url}
                          key={item.url}
                          activeOnlyWhenExact={item.exact}>
            <i className={item.icon}></i>
            <p>{item.name}</p>
          </NavigationLink>
      );
    } else {
      return (
          <NavigationLink to={item.url}
                          key={item.url}
                          activeOnlyWhenExact={item.exact}>
            <span className="sidebar-mini">{item.mini}</span>
            <span className="sidebar-normal">{item.name}</span>
          </NavigationLink>
      );
    }
  };

  render(){
    return(
        <ul className="nav">
          {nav.map(Navigation.buildLinks)}
        </ul>
    );
  }
}