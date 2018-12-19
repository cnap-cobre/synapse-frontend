// @flow

import React from 'react';
import { connect } from 'react-redux';

import dropboxIcon from './dropbox_icon.png';
import agaveIcon from './agave_icon.png';
import globusIcon from './globus_icon.png';
import jupyterHubIcon from './jupyterhub_icon.png';

type Props = {
  provider: string,
  image: any,
  next: string,
  action: 'connect' | 'login',
}

type InstanceProps = {
  next: string,
  action: 'connect' | 'login',
}

const SocialSignInButtonPure = (props: Props) => {
  const {
    provider, image, next, action,
  } = props;
  return (
    <a
      title={`Sign in with ${provider}`}
      className={`btn btn-block btn-social socialaccount_provider btn-${provider.toLowerCase()}`}
      href={`/accounts/${provider.toLowerCase()}/login/?process=${action}&next=${next}`}
      style={{
        maxWidth: '400px',
      }}
    >
      <img src={image} alt={`${provider} logo`} />
      {action === 'login' ? 'Sign In with' : null}
      {action === 'connect' ? 'Connect' : null}
      &nbsp;
      {provider}
    </a>
  );
};

const mapStateToProps = (store, ownProps) => ({
  next: encodeURI(ownProps.next ? ownProps.next : store.router.pathname),
});

const SocialSignInButton = connect(mapStateToProps)(SocialSignInButtonPure);

export const DropboxSignInButton = (props: InstanceProps) => {
  const { next, action } = props;
  return (
    <SocialSignInButton
      provider="Dropbox"
      image={dropboxIcon}
      next={next}
      action={action}
    />
  );
};

export const AgaveSignInButton = (props: InstanceProps) => {
  const { next, action } = props;
  return (
    <SocialSignInButton
      provider="Agave"
      image={agaveIcon}
      next={next}
      action={action}
    />
  );
};

export const GlobusSignInButton = (props: InstanceProps) => {
  const { next, action } = props;
  return (
    <SocialSignInButton
      provider="Globus"
      image={globusIcon}
      next={next}
      action={action}
    />
  );
};

export const JupyterHubSignInButton = (props: InstanceProps) => {
  const { next, action } = props;
  return (
    <SocialSignInButton
      provider="JupyterHub"
      image={jupyterHubIcon}
      next={next}
      action={action}
    />
  );
};

export default SocialSignInButton;
