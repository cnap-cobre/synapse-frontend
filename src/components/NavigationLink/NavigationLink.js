// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'redux-json-router';

type Props = {
  to: string,
  activeOnlyWhenExact: boolean,
  pathname: string,
  children?: React.Node,
}

const NavigationLink = (props: Props) => {
  const {
    to, pathname, children, activeOnlyWhenExact,
  } = props;

  let match;
  if (activeOnlyWhenExact) {
    match = to === pathname;
  } else {
    match = pathname.indexOf(to) === 0;
  }

  return (
    <li className={match ? 'active' : ''}>
      <Link to={to}>
        {children}
      </Link>
    </li>
  );
};

NavigationLink.defaultProps = {
  children: null,
};

const mapStateToProps = store => ({ pathname: store.router.pathname });

export default connect(
  mapStateToProps,
)(NavigationLink);
