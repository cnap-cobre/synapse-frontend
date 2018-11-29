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
  AnyModalType,
} from '../../types/modalTypes';

type Props = {
  modals: { [string]: AnyModalType },
}

const isType = (m: AnyModalType, key: string) => Object.prototype.hasOwnProperty.call(m, key);

const ModalWrapper = (props: Props) => {
  const { modals } = props;

  return (
    <div>
      {Object.keys(modals).map((id) => {
        const modal = modals[id];

        if (isType(modal, 'deleteModal')) {
          return (
            <DeleteFileModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'linkBeocatModal')) {
          return (
            <LinkBeocatWizardModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'makeDirectoryModal')) {
          return (
            <MakeDirectoryModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'moveCopyModal')) {
          return (
            <MoveCopyModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'renameFileModal')) {
          return (
            <RenameFileModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'successMessageModal')) {
          return (
            <SuccessMessageModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        if (isType(modal, 'transferModal')) {
          return (
            <TransferModal
              key={id}
              id={id}
              {...modal}
            />
          );
        }

        return null;
      })}
    </div>
  );
};

const mapStateToProps = store => ({
  modals: store.modals,
});

export default connect(mapStateToProps)(ModalWrapper);
