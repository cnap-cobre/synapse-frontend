// @flow

import {addModal} from "../../../store/ui/modals/Modals";
import {connect} from 'react-redux';
import React from 'react';
import './beocatButton.scss';

type Props = {
  hasLinkedAgaveAccount: boolean
}

class LinkBeocatButton extends React.Component<Props> {
  onButtonClick = () => {
    addModal({
      modalType: 'linkBeocatWizard'
    });
  };

  render() {
    const button = (
        <button title="Beocat"
                className="btn btn-block btn-social btn-beocat"
                onClick={this.onButtonClick}
        >
          <img src="/dj-static/img/ksu-logo.svg" />
          Link your Beocat Account
        </button>

    );

    const linkAgaveButton = (
        <a href="/accounts/agave/login/?process=connect"
           className="btn btn-block btn-social socialaccount_provider btn-agave"
        >
          <img src="/dj-static/img/agave_icon.png" />
            First, link your Agave Account
        </a>
    );

    return this.props.hasLinkedAgaveAccount ? button : linkAgaveButton;
  }
}

const mapStateToProps = (store) => {
  return {
    hasLinkedAgaveAccount: store.userProfile.agave.length !== 0
  };
};

const mapDispatchToProps = {
  addModal,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkBeocatButton);