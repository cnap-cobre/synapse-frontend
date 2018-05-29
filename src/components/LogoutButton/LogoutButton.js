import React, { Component } from 'react';
import { withCookies, Cookies } from "react-cookie";
import {instanceOf} from "prop-types";

class LogoutButton extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  render(){
    const csrf = this.props.cookies.get('csrftoken');

    return (
        <form method="post" action="/accounts/logout/">
          <button className="btn btn-danger btn-fill" type="submit">
            Sign Out
          </button>
          <input type="hidden" name="csrfmiddlewaretoken" value={csrf} />
        </form>
    );
  }
}

export default withCookies(LogoutButton);