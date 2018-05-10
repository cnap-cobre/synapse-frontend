import React, {Component} from 'react';
import NavigationLink from 'Components/NavigationLink';
import NavigationGroup from 'Components/NavigationGroup';

export default class Navigation extends Component {
  render(){
    return(
        <ul className="nav">
          <NavigationLink to='/' activeOnlyWhenExact={true}>
            <i className="ti-dashboard"/>
            <p>Dashboard</p>
          </NavigationLink>

          <NavigationLink to='/files/' activeOnlyWhenExact={true}>
            <i className="ti-folder"/>
            <p>Files</p>
          </NavigationLink>

          <NavigationLink to='/editor/' activeOnlyWhenExact={true}>
            <i className="ti-paragraph"/>
            <p>Code Editor</p>
          </NavigationLink>

          <NavigationLink to='/compute/' activeOnlyWhenExact={true}>
            <i className="ti-cloud"/>
            <p>Compute Jobs</p>
          </NavigationLink>

          <NavigationLink to='/shell/' activeOnlyWhenExact={true}>
            <i className="ti-layout-cta-left"/>
            <p>Shell</p>
          </NavigationLink>

          <NavigationGroup to='/desktop/' icon='ti-layout-tab-window' label='Desktop Apps' activeOnlyWhenExact={true}>
            <NavigationLink
                to='/desktop/jupyter/'
                activeOnlyWhenExact={true}>
              <span className="sidebar-mini">J</span>
              <span className="sidebar-normal">Jupyter Notebooks</span>
            </NavigationLink>

            <NavigationLink
                to='/desktop/matlab/'
                icon='ti-panel'
                activeOnlyWhenExact={true}>
              <span className="sidebar-mini">M</span>
              <span className="sidebar-normal">Matlab</span>
            </NavigationLink>

            <NavigationLink
                to='/desktop/octave/'
                activeOnlyWhenExact={true}>
              <span className="sidebar-mini">O</span>
              <span className="sidebar-normal">Octave</span>
            </NavigationLink>

            <NavigationLink
                to='/desktop/xnat/'
                activeOnlyWhenExact={true}>
              <span className="sidebar-mini">X</span>
              <span className="sidebar-normal">XNAT</span>
            </NavigationLink>
          </NavigationGroup>
        </ul>
    );
  }
}