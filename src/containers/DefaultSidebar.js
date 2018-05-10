import React, { Component } from 'react';
import Logo from 'Components/Logo/Logo';

export default class DefaultSidebar extends Component {
  render() {
    return (
        <div className="sidebar"
             data-background-color="white"
             data-active-color="danger">
          <Logo/>
          <div className="sidebar-wrapper">
            <div className="user">
              <div className="photo">
                <img src="../../assets/img/faces/face-2.jpg"/>
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
                      <a href="#settings">
                        <span className="sidebar-mini">S</span>
                        <span className="sidebar-normal">Settings</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <ul className="nav">
              <li>
                <a data-toggle="collapse" href="#dashboardOverview">
                  <i className="ti-panel"></i>
                  <p>Dashboard
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse" id="dashboardOverview">
                  <ul className="nav">
                    <li>
                      <a href="../dashboard/overview.html">
                        <span className="sidebar-mini">O</span>
                        <span className="sidebar-normal">Overview</span>
                      </a>
                    </li>
                    <li>
                      <a href="../dashboard/stats.html">
                        <span className="sidebar-mini">S</span>
                        <span className="sidebar-normal">Stats</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="active">
                <a data-toggle="collapse" href="#componentsExamples" aria-expanded="true">
                  <i className="ti-package"></i>
                  <p>Components
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse in" id="componentsExamples">
                  <ul className="nav">
                    <li>
                      <a href="../components/buttons.html">
                        <span className="sidebar-mini">B</span>
                        <span className="sidebar-normal">Buttons</span>
                      </a>
                    </li>
                    <li>
                      <a href="../components/grid.html">
                        <span className="sidebar-mini">GS</span>
                        <span className="sidebar-normal">Grid System</span>
                      </a>
                    </li>
                    <li>
                      <a href="../components/panels.html">
                        <span className="sidebar-mini">P</span>
                        <span className="sidebar-normal">Panels</span>
                      </a>
                    </li>
                    <li className="active">
                      <a href="../components/sweet-alert.html">
                        <span className="sidebar-mini">SA</span>
                        <span className="sidebar-normal">Sweet Alert</span>
                      </a>
                    </li>
                    <li>
                      <a href="../components/notifications.html">
                        <span className="sidebar-mini">N</span>
                        <span className="sidebar-normal">Notifications</span>
                      </a>
                    </li>
                    <li>
                      <a href="../components/icons.html">
                        <span className="sidebar-mini">I</span>
                        <span className="sidebar-normal">Icons</span>
                      </a>
                    </li>
                    <li>
                      <a href="../components/typography.html">
                        <span className="sidebar-mini"><i className="ti-panel"></i></span>
                        <span className="sidebar-normal">Typography</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a data-toggle="collapse" href="#formsExamples">
                  <i className="ti-clipboard"></i>
                  <p>
                    Forms
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse" id="formsExamples">
                  <ul className="nav">
                    <li>
                      <a href="../forms/regular.html">
                        <span className="sidebar-mini">Rf</span>
                        <span className="sidebar-normal">Regular Forms</span>
                      </a>
                    </li>
                    <li>
                      <a href="../forms/extended.html">
                        <span className="sidebar-mini">Ef</span>
                        <span className="sidebar-normal">Extended Forms</span>
                      </a>
                    </li>
                    <li>
                      <a href="../forms/validation.html">
                        <span className="sidebar-mini">Vf</span>
                        <span className="sidebar-normal">Validation Forms</span>
                      </a>
                    </li>
                    <li>
                      <a href="../forms/wizard.html">
                        <span className="sidebar-mini">W</span>
                        <span className="sidebar-normal">Wizard</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a data-toggle="collapse" href="#tablesExamples">
                  <i className="ti-map"></i>
                  <p>
                    Table list
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse" id="tablesExamples">
                  <ul className="nav">
                    <li>
                      <a href="../tables/regular.html">
                        <span className="sidebar-mini">RT</span>
                        <span className="sidebar-normal">Regular Tables</span>
                      </a>
                    </li>
                    <li>
                      <a href="../tables/extended.html">
                        <span className="sidebar-mini">ET</span>
                        <span className="sidebar-normal">Extended Tables</span>
                      </a>
                    </li>
                    <li>
                      <a href="../tables/bootstrap-table.html">
                        <span className="sidebar-mini">BT</span>
                        <span className="sidebar-normal">Bootstrap Table</span>
                      </a>
                    </li>
                    <li>
                      <a href="../tables/datatables.net.html">
                        <span className="sidebar-mini">DT</span>
                        <span className="sidebar-normal">DataTables.net</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a data-toggle="collapse" href="#mapsExamples">
                  <i className="ti-view-list-alt"></i>
                  <p>
                    Maps
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse" id="mapsExamples">
                  <ul className="nav">
                    <li>
                      <a href="../maps/google.html">
                        <span className="sidebar-mini">GM</span>
                        <span className="sidebar-normal">Google Maps</span>
                      </a>
                    </li>
                    <li>
                      <a href="../maps/vector.html">
                        <span className="sidebar-mini">VM</span>
                        <span className="sidebar-normal">Vector maps</span>
                      </a>
                    </li>
                    <li>
                      <a href="../maps/fullscreen.html">
                        <span className="sidebar-mini">FSM</span>
                        <span className="sidebar-normal">Full Screen Map</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href="../charts.html">
                  <i className="ti-bar-chart-alt"></i>
                  <p>Charts</p>
                </a>
              </li>
              <li>
                <a href="../calendar.html">
                  <i className="ti-calendar"></i>
                  <p>Calendar</p>
                </a>
              </li>
              <li>
                <a data-toggle="collapse" href="#pagesExamples">
                  <i className="ti-gift"></i>
                  <p>
                    Pages
                    <b className="caret"></b>
                  </p>
                </a>
                <div className="collapse" id="pagesExamples">
                  <ul className="nav">
                    <li>
                      <a href="../pages/timeline.html">
                        <span className="sidebar-mini">TP</span>
                        <span className="sidebar-normal">Timeline Page</span>
                      </a>
                    </li>
                    <li>
                      <a href="../pages/user.html">
                        <span className="sidebar-mini">UP</span>
                        <span className="sidebar-normal">User Page</span>
                      </a>
                    </li>
                    <li>
                      <a href="../pages/login.html">
                        <span className="sidebar-mini">LP</span>
                        <span className="sidebar-normal">Login Page</span>
                      </a>
                    </li>
                    <li>
                      <a href="../pages/register.html">
                        <span className="sidebar-mini">RP</span>
                        <span className="sidebar-normal">Register Page</span>
                      </a>
                    </li>
                    <li>
                      <a href="../pages/lock.html">
                        <span className="sidebar-mini">LSP</span>
                        <span className="sidebar-normal">Lock Screen Page</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}