// @flow

import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { connect } from 'react-redux';
import { FaPlusSquare } from 'react-icons/fa';
import { directoryActions } from '../../../store/files/Files';
import { addModal } from '../../../store/ui/modals/Modals';

type Props = {
  path: string,
  makeDirectory(path: string, name: string) : typeof undefined,
  addModal(any): typeof undefined,
};

class AddDirectoryButton extends React.Component<Props> {
  openModal = () => {
    const { addModal, makeDirectory, path } = this.props;
    addModal({
      modalType: 'makeDirectoryModal',
      action: (directoryName) => {
        makeDirectory(path, directoryName);
      },
    });
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

const mapDispatchToProps = {
  addModal,
  makeDirectory: directoryActions.makeDirectory,
};

export default connect(
  null,
  mapDispatchToProps,
)(AddDirectoryButton);
