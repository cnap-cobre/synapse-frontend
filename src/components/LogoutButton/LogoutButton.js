import { instanceOf } from "prop-types";
import React from 'react';
import { Cookies, withCookies } from "react-cookie";



class LogoutButton extends React.Component {
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