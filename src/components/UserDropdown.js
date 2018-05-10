import React, {Component} from 'react';
import face from '../face-2.jpg';

export default class UserDropdown extends Component {
  render() {
    return (
        <div className="user">
          <div className="photo">
            <img src={face} alt="User Profile Photo"/>
          </div>
          <div className="info">
            <a data-toggle="collapse" href="#collapseExample" className="collapsed">
              <span>
								Your Name
		            <b className="caret"></b>
							</span>
            </a>
            <div className="clearfix"></div>

            <div className="collapse" id="collapseExample">
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
          </div>
        </div>
    );
  }
}
