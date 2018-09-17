import {addModal} from "../../../actions/modals";
import {connect} from 'react-redux';
import React from 'react';
import './beocatButton.scss';

class LinkBeocatButton extends React.Component {
  onButtonClick = () => {
    this.props.dispatch(addModal({
      modalType: 'linkBeocatWizard'
    }));
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

export default connect(mapStateToProps)(LinkBeocatButton);