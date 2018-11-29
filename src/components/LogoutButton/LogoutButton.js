// @flow

import { connect } from 'react-redux';
import React from 'react';

type Props = {
  csrftoken: string,
}

const LogoutButton = (props: Props) => {
  const { csrftoken } = props;

  return (
    <form method="post" action="/accounts/logout/">
      <button className="btn btn-danger btn-fill" type="submit">
          Sign Out
      </button>
      <input
        type="hidden"
        name="csrfmiddlewaretoken"
        value={csrftoken}
      />
    </form>
  );
};

const mapStateToProps = store => ({
  csrftoken: store.csrf.token,
});

export default connect(
  mapStateToProps,
)(LogoutButton);
