// @flow

import { connect } from 'react-redux';
import React from 'react';
import { addModal } from '../../../store/ui/modals/Modals';
import agaveIcon from '../agave_icon.png';
import './beocatButton.scss';

type Props = {
  hasLinkedAgaveAccount: boolean,
  $addModal({ modalType: string }): typeof undefined,
}

class LinkBeocatButton extends React.Component<Props> {
  onButtonClick = () => {
    const { $addModal } = this.props;
    $addModal({
      modalType: 'linkBeocatWizard',
    });
  };

  render() {
    const { hasLinkedAgaveAccount } = this.props;

    const button = (
      <button
        title="Beocat"
        className="btn btn-block btn-social btn-beocat"
        onClick={this.onButtonClick}
        type="button"
      >
        <img src="/dj-static/img/ksu-logo.svg" alt="K-State Logo" />
          Link your Beocat Account
      </button>

    );

    const linkAgaveButton = (
      <a
        href="/accounts/agave/login/?process=connect&next=/files/systems"
        className="btn btn-block btn-social socialaccount_provider btn-agave"
      >
        <img src={agaveIcon} alt="Agave Logo" />
            First, link your Agave Account
      </a>
    );

    return hasLinkedAgaveAccount ? button : linkAgaveButton;
  }
}

const mapStateToProps = store => ({
  hasLinkedAgaveAccount: store.userProfile.agave.length !== 0,
});

const mapDispatchToProps = {
  $addModal: addModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkBeocatButton);
