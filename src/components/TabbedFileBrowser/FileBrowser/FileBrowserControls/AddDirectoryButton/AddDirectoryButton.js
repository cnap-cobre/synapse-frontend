import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import PropTypes from 'prop-types';
import React from 'react';
import { directoryActions } from '../../../../../store/files/Files';
import { addModal } from '../../../../../store/ui/modals/Modals';

class AddDirectoryButton extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
  };

  openModal = () => {
    this.props.dispatch(addModal({
      modalType: 'makeDirectory',
      action: (directoryName) => {
        this.props.dispatch(directoryActions.makeDirectory(this.props.path, directoryName));
      },
    }));
  };

  render = () => (
    <Button
      id="AddDirectoryButton"
      bsSize="xsmall"
      style={{
        height: '2.7em',
        marginTop: '0.5em',
        float: 'right',
      }}
      onClick={this.openModal}
    >
      <FaPlusSquare />
&nbsp;New Folder
    </Button>
  );
}

export default connect()(AddDirectoryButton);
