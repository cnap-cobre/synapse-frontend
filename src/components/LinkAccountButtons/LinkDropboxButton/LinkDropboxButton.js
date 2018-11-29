// @flow
import { connect } from 'react-redux';
import React from 'react';

type Props = {
  hasLinkedDropbox: boolean
}

class LinkDropboxButton extends React.Component<Props> {
  render() {
    const linkButton = (
      <a
        title="Dropbox"
        className="btn btn-block btn-social socialaccount_provider btn-dropbox"
        href="/accounts/dropbox/login/?process=connect"
      >
        <img src="/dj-static/img/dropbox_icon.png" />
          Link your Dropbox Account
      </a>
    );

    const unlink = (
      <p>
          Dropbox is linked.
          Click
        {' '}
        <a href="/accounts/social/connections/">here</a>
        {' '}
to
          unlink.
      </p>
    );

    return (this.props.hasLinkedDropbox ? unlink : linkButton);
  }
}

const mapStateToProps = state => ({
  hasLinkedDropbox: state.userProfile.dropbox.length > 0,
});

export default connect(mapStateToProps)(LinkDropboxButton);
