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

    return button;
  }
}

export default connect()(LinkBeocatButton);