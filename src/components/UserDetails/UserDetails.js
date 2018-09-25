import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';


class UserDetails extends React.Component {
  static propTypes = {
    profilePhoto: PropTypes.string.isRequired,
  }

  render = () => (
      <div>
        <h5>
          {this.props.user.full_name}
        </h5>
        <p>
          <strong>Username:</strong> {this.props.user.username}
        </p>
      </div>
  );
}

const mapStateToProps = ({ userProfile }) => ({
  user: userProfile.user
});

export default connect(mapStateToProps)(UserDetails);