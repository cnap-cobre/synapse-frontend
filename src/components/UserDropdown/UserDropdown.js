import React, {Component} from 'react';
import {Collapse} from 'react-bootstrap';
import face from '../../face-2.jpg';

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
              <img src={face} />
            </div>

            <a data-toggle="collapse"
               onClick={() => {this.setState({open: !this.state.open})}}>
	                        <span>
								Your Name
		                        <b className="caret"></b>
							</span>
            </a>
            <div className="clearfix"></div>

            <Collapse in={this.state.open}>
              <div>
                <ul className="nav">
                  <li>
                    <a href="#profile">
                      <span className="sidebar-mini">Mp</span>
                      <span className="sidebar-normal">My Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#edit">
                      <span className="sidebar-mini">Ep</span>
                      <span className="sidebar-normal">Edit Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="/account/logout/">
                      <span className="sidebar-mini">L</span>
                      <span className="sidebar-normal">Logout</span>
                    </a>
                  </li>
                </ul>
              </div>
            </Collapse>
          </div>
        </div>
    );
  }
}
