// @flow

import { connect } from 'react-redux';
import React from 'react';
import type { userStateType } from '../../types/userProfileTypes';

type Props = {
  user: userStateType
}

const UserDetails = (props: Props) => {
  const { user } = props;
  return (
    <div>
      <h5>
        {user.full_name}
      </h5>
      <p>
        <strong>Username:</strong>
        {' '}
        {user.username}
      </p>
    </div>
  );
};

const mapStateToProps = ({ userProfile }) => ({
  user: userProfile.user,
});

export default connect(mapStateToProps)(UserDetails);
