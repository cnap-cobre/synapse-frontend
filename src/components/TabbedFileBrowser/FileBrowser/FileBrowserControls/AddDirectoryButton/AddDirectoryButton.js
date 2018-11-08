import {addModal} from "../../../../../store/Modals";
import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import PropTypes from 'prop-types';
import React from "react";
import {fetchFilesIfNeeded, invalidateFiles, makeDirectory} from "../../../../../store/files/actions";

class AddDirectoryButton extends React.Component{
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  delayedRefresh = (path) => () => {
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      this.props.dispatch(invalidateFiles(path));
      this.props.dispatch(fetchFilesIfNeeded(path));
    }, 200);
  };

  openModal = () => {
    this.props.dispatch(addModal({
      modalType: 'makeDirectory',
      action: (directoryName) => {
        this.props.dispatch(makeDirectory(this.props.path, directoryName))
            .then(this.delayedRefresh(this.props.path))
      }
    }));
  };

  render = () => (
      <Button id="AddDirectoryButton"
              bsSize="xsmall"
              style={{
                height: "2.7em",
                marginTop: "0.5em",
                float: 'right'
              }}
              onClick={this.openModal}
      >
        <FaPlusSquare/>&nbsp;New Folder
      </Button>
  );
}

export default connect()(AddDirectoryButton);