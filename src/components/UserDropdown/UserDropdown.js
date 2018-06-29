import React, {Component} from 'react';
import {Collapse} from 'react-bootstrap';
import NavigationLink from '../../components/Navigation/NavigationLink/NavigationLink';

export default class UserDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  static propTypes = {};

  render() {
    return (
        <div className="user">
          <div className="info">
            <div className="photo">
              <img src={this.props.userProfile.gravatar.url} />
            </div>

            <a data-toggle="collapse"
               onClick={() => {this.setState({open: !this.state.open})}}>
              <span>
                {this.props.userProfile.user.full_name}
		            <b className="caret"></b>
							</span>
            </a>
            <div className="clearfix"></div>

            <Collapse in={this.state.open}>
              <div>
                <ul className="nav">

                  <NavigationLink to="/account/" activeOnlyWhenExact={true}>
                    <span className="sidebar-mini">A</span>
                    <span className="sidebar-normal">Account</span>
                  </NavigationLink>

                  <NavigationLink to="/account/logout/" activeOnlyWhenExact={true}>
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
