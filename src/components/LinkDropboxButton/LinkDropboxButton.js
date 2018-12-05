// @flow
import { connect } from 'react-redux';
import React from 'react';

type Props = {
  hasLinkedDropbox: boolean
}

const LinkDropboxButton = (props: Props) => {
  const { hasLinkedDropbox } = props;

  const linkButton = (
    <a
      title="Dropbox"
      className="btn btn-block btn-social socialaccount_provider btn-dropbox"
      href="/accounts/dropbox/login/?process=connect"
    >
      <img src="/dj-static/img/dropbox_icon.png" alt="Dropbox Logo" />
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

  return (hasLinkedDropbox ? unlink : linkButton);
};

const mapStateToProps = store => ({
  hasLinkedDropbox: store.userProfile.dropbox.length > 0,
});

export default connect(mapStateToProps)(LinkDropboxButton);
