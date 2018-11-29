import { connect } from 'react-redux';
import React from 'react';
import DeleteFileModal from './DeleteFileModal';
import LinkBeocatWizardModal from './LinkBeocatWizardModal';
import MakeDirectoryModal from './MakeDirectoryModal';
import MoveCopyModal from './MoveCopyModal';
import RenameFileModal from './RenameFileModal';
import SuccessMessageModal from './SuccessMessageModal';
import TransferModal from './TransferModal';


class ModalWrapper extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.modals).map((id, i) => {
          switch (this.props.modals[id].modalType) {
            case 'deleteFile':
              return (
                <DeleteFileModal
                  key={i}
                  id={id}
                  action={this.props.modals[id].action}
                  files={this.props.modals[id].files}
                />
              );
            case 'linkBeocatWizard':
              return (
                <LinkBeocatWizardModal
                  key={i}
                  id={id}
                />
              );
            case 'makeDirectory':
              return (
                <MakeDirectoryModal
                  key={i}
                  id={id}
                  action={this.props.modals[id].action}
                />
              );
            case 'moveCopyFile':
              return (
                <MoveCopyModal
                  key={i}
                  id={id}
                  action={this.props.modals[id].action}
                  title={this.props.modals[id].title}
                  files={this.props.modals[id].files}
                  promptVerb={this.props.modals[id].promptVerb}
                  submitText={this.props.modals[id].submitText}
                  path={this.props.modals[id].path}
                  systemName={this.props.modals[id].systemName}
                />
              );
            case 'renameFile':
              return (
                <RenameFileModal
                  key={i}
                  id={id}
                  action={this.props.modals[id].action}
                  fileName={this.props.modals[id].fileName}
                />
              );
            case 'successMessage':
              return (
                <SuccessMessageModal
                  key={i}
                  id={id}
                  text={this.props.modals[id].text}
                />
              );
            case 'transfer':
              return (
                <TransferModal
                  key={i}
                  id={id}
                  action={this.props.modals[id].action}
                  files={this.props.modals[id].files}
                />
              );
            default:
              return (null);
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  modals: store.modals,
});

export default connect(mapStateToProps)(ModalWrapper);
