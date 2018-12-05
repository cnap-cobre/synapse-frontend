// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Collapse from 'react-bootstrap/lib/Collapse';

/*
 Note:

 The data-toggle="collapse" does nothing.  The CSS for our
 template was written expecting it to be there.  The old jQuery
 implementation of Bootstrap's Collapse feature used it, but
 this React implementation does not.
*/

type Props = {
  to: string,
  activeOnlyWhenExact: boolean,
  icon: string,
  label: string,
  pathname: string,
  children?: React.Node,
}

type State = {
  open: boolean,
}

class NavigationGroup extends React.Component<Props, State> {
  state = {
    open: false,
  };

  render() {
    const {
      activeOnlyWhenExact, pathname, to, icon, label, children,
    } = this.props;
    const { open } = this.state;

    let match;
    if (activeOnlyWhenExact) {
      match = to === pathname;
    } else {
      match = pathname.indexOf(to) === 0;
    }

    return (
      <li className={match ? 'active' : ''}>
        <a onClick={() => this.setState({ open: !open })} data-toggle="collapse">
          <i className={icon} />
          <p>
            {label}
            <b className="caret" />
          </p>
        </a>
        <Collapse in={open}>
          <div>
            <ul className="nav">
              {children}
            </ul>
          </div>
        </Collapse>
      </li>
    );
  }
}

const mapStateToProps = store => ({ pathname: store.router.pathname });

export default connect(
  mapStateToProps,
)(NavigationGroup);
