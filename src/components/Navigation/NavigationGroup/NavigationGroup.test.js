import NavigationGroup from './NavigationGroup';
import React from 'react';
import ReactDOM from 'react-dom';

it('renders without crashing', ()=>{
  const div = document.createElement('div');
  ReactDOM.render((
    <NavigationGroup
      to="/cake"
      activeOnlyWhenExact={true}
      icon="ti-calendar"
      label="Cake"
    >
      <span>Cake</span>
    </NavigationGroup>
  ), div);
  ReactDOM.unmountComponentAtNode(div);
});