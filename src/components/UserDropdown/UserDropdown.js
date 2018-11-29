import Collapse from 'react-bootstrap/lib/Collapse';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import NavigationLink from '../Navigation/NavigationLink/NavigationLink';

class UserDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  static propTypes = {
    fullName: PropTypes.string.isRequired,
    gravatar: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="user">
        <div className="info">
          <div className="photo">
            <img src={this.props.gravatar} />
          </div>

          <a
            data-toggle="collapse"
            onClick={() => { this.setState({ open: !this.state.open }); }}
          >
            <span>
              {this.props.fullName}
              <b className="caret" />
            </span>
          </a>
          <div className="clearfix" />

          <Collapse in={this.state.open}>
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
