import React from 'react';
import './beocatButton.scss';

export default class LinkBeocatButton extends React.Component {
  render() {
    const button = (
        <button title="Beocat"
                className="btn btn-block btn-social btn-beocat"
        >
          <img src="/dj-static/img/ksu-logo.svg" />
          Link your Beocat Account
        </button>

    );

    return button;
  }
}