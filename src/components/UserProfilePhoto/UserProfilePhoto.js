import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';


class UserProfilePhoto extends React.Component {
  static propTypes = {
    profilePhoto: PropTypes.string.isRequired,
  }

  render = () => (
    <img src={this.props.profilePhoto} alt="Profile Photo" />
  );
}

const mapStateToProps = ({ userProfile }) => ({
  profilePhoto: userProfile.gravatar.url,
});

export default connect(mapStateToProps)(UserProfilePhoto);
