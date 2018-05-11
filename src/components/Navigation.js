import React, {Component} from 'react';
import NavigationLink from 'Components/NavigationLink';
import NavigationGroup from 'Components/NavigationGroup';
import nav from '../nav.js';

export default class Navigation extends Component {
  render(){
    console.log(nav);

    const mapGroupChildren = (children) => {
      return children.map((item) => {
        return (
            <NavigationLink to={item.url}
                            key={item.url}
                            activeOnlyWhenExact={item.exact}>
              <span className="sidebar-mini">{item.mini}</span>
              <span className="sidebar-normal">{item.name}</span>
            </NavigationLink>
        );
      });
    }

    const links = nav.map((item) => {
      if (item.hasOwnProperty('children')) {
        return (
            <NavigationGroup to={item.url}
                             key={item.url}
                             icon={item.icon}
                             label={item.name}
                             activeOnlyWhenExact={item.exact}>
              {mapGroupChildren(item.children)}
            </NavigationGroup>
        );
      } else {
        return (
          <NavigationLink to={item.url}
                          key={item.url}
                          activeOnlyWhenExact={item.exact}>
            <i className={item.icon}></i>
            <p>{item.name}</p>
          </NavigationLink>
        );
      }
    });

    return(
        <ul className="nav">
          {links}
        </ul>
    );
  }
}