// @flow

import type { FileType } from './fileTypes';
import type { FileSystemType } from './fileSystemTypes';

export type BaseModal = {
  id: string,
  modalType: string,
}

export type DeleteFileModalType = BaseModal & {
  deleteModal: true,
  action(): typeof undefined,
  files: Array<FileType>,
};

export type LinkBeocatWizardModalType = BaseModal & {
  linkBeocatModal: true,
  modalType: 'linkBeocatWizard',
};

export type MakeDirectoryModalType = BaseModal & {
  makeDirectoryModal: true,
  action(string): typeof undefined,
};

export type MoveCopyModalType = BaseModal & {
  moveCopyModal: true,
  action(string, string): typeof undefined,
  title: string,
  files: Array<FileType>,
  promptVerb: string,
  submitText: string,
  path: string,
  systemName: string,
};

export type RenameFileModalType = BaseModal & {
  renameFileModal: true,
  action(string): typeof undefined,
  fileName: string,
};

export type SuccessMessageModalType = BaseModal & {
  successMessageModal: true,
  text: string,
  action(string): typeof undefined,
}

export type TransferModalType = BaseModal & {
  transferModal: true,
  action(string): typeof undefined,
  files: Array<FileType>,
  fileSystems: Array<FileSystemType>,
}

export type AnyModalType = DeleteFileModalType | LinkBeocatWizardModalType
    | MakeDirectoryModalType | MoveCopyModalType | RenameFileModalType
    | SuccessMessageModalType | TransferModalType;
