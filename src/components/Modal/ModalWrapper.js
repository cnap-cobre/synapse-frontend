// @flow

import { connect } from 'react-redux';
import React from 'react';
import DeleteFileModal from './DeleteFileModal';
import LinkBeocatWizardModal from './LinkBeocatWizardModal';
import MakeDirectoryModal from './MakeDirectoryModal';
import MoveCopyModal from './MoveCopyModal';
import RenameFileModal from './RenameFileModal';
import SuccessMessageModal from './SuccessMessageModal';
import TransferModal from './TransferModal';
import type {
  DeleteFileModalType,
  LinkBeocatWizardModalType,
  MakeDirectoryModalType,
  MoveCopyModalType, RenameFileModalType, SuccessMessageModalType, TransferModalType,
} from '../../types/modalTypes';

type Props = {
  modals: DeleteFileModalType | LinkBeocatWizardModalType
      | MakeDirectoryModalType | MoveCopyModalType | RenameFileModalType
      | SuccessMessageModalType | TransferModalType,
}

const ModalWrapper = (props: Props) => {
  const { modals } = props;

  return (
    <div>
      {Object.keys(modals).map((id) => {
        const modal = modals[id];
        switch (modal.modalType) {
          case 'deleteFile':
            return (
              <DeleteFileModal
                key={id}
                id={id}
                action={modal.action}
                files={modal.files}
              />
            );
          case 'linkBeocatWizard':
            return (
              <LinkBeocatWizardModal
                key={id}
                id={id}
              />
            );
          case 'makeDirectory':
            return (
              <MakeDirectoryModal
                key={id}
                id={id}
                action={modal.action}
              />
            );
          case 'moveCopyFile':
            return (
              <MoveCopyModal
                key={id}
                id={id}
                action={modal.action}
                title={modal.title}
                files={modal.files}
                promptVerb={modal.promptVerb}
                submitText={modal.submitText}
                path={modal.path}
                systemName={modal.systemName}
              />
            );
          case 'renameFile':
            return (
              <RenameFileModal
                key={id}
                id={id}
                action={modal.action}
                fileName={modal.fileName}
              />
            );
          case 'successMessage':
            return (
              <SuccessMessageModal
                key={id}
                id={id}
                text={modal.text}
              />
            );
          case 'transfer':
            return (
              <TransferModal
                key={id}
                id={id}
                action={modal.action}
                files={modal.files}
              />
            );
          default:
            return (null);
        }
      })}
    </div>
  );
};

const mapStateToProps = store => ({
  modals: store.modals,
});

export default connect(mapStateToProps)(ModalWrapper);
