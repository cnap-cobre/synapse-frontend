// @flow

import { connect } from 'react-redux';
import React from 'react';

type Props = {
  profilePhoto: string,
}

const UserProfilePhoto = (props: Props) => {
  const { profilePhoto } = props;
  return (
    <img src={profilePhoto} alt="User Profile" />
  );
};

const mapStateToProps = ({ userProfile }) => ({
  profilePhoto: userProfile.gravatar.url,
});

export default connect(mapStateToProps)(UserProfilePhoto);
