import React from 'react';

export default class LinkDropboxButton extends React.Component {
  render() {
    const button = (
        <a title="Dropbox"
           className="btn btn-block btn-social socialaccount_provider btn-dropbox"
           href="/accounts/dropbox/login/?process=connect">
          <img src="/dj-static/img/dropbox_icon.png" />
          Link your Dropbox Account
        </a>
    );

    return button;
  }
}