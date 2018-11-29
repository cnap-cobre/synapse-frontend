import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';


class LogoutButton extends React.Component {
  static propTypes = {
    csrftoken: PropTypes.string.isRequired,
  };

  render() {
    return (
      <form method="post" action="/accounts/logout/">
        <button className="btn btn-danger btn-fill" type="submit">
            Sign Out
        </button>
        <input
          type="hidden"
          name="csrfmiddlewaretoken"
          value={this.props.csrftoken}
        />
      </form>
    );
  }
}

const mapStateToProps = store => ({
  csrftoken: store.csrf.token,
});

export default connect(
  mapStateToProps,
)(LogoutButton);
