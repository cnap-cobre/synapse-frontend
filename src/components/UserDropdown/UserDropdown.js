// @flow

import Collapse from 'react-bootstrap/lib/Collapse';
import { connect } from 'react-redux';
import React from 'react';
import NavigationLink from '../NavigationLink/NavigationLink';

type Props = {
  fullName: string,
  gravatar: string,
}

type State = {
  open: boolean,
}

class UserDropdown extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  render() {
    const { fullName, gravatar } = this.props;
    const { open } = this.state;

    return (
      <div className="user">
        <div className="info">
          <div className="photo">
            <img src={gravatar} alt="Your avatar" />
          </div>

          { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
          <a
            data-toggle="collapse"
            onClick={() => { this.setState({ open: !open }); }}
          >
            <span>
              {fullName}
              <b className="caret" />
            </span>
          </a>
          <div className="clearfix" />

          <Collapse in={open}>
            <div>
              <ul className="nav">

                <NavigationLink to="/account/" activeOnlyWhenExact>
                  <span className="sidebar-mini">A</span>
                  <span className="sidebar-normal">Account</span>
                </NavigationLink>

                <NavigationLink to="/account/logout/" activeOnlyWhenExact>
                  <span className="sidebar-mini">L</span>
                  <span className="sidebar-normal">Logout</span>
                </NavigationLink>

              </ul>
            </div>
          </Collapse>
        </div>
      </div>
    );
  }
}


const mapStateToProps = ({ userProfile }) => ({
  fullName: userProfile.user.full_name,
  gravatar: userProfile.gravatar.url,
});

export default connect(mapStateToProps)(UserDropdown);
