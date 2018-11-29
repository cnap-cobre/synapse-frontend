import type { FileType } from './fileTypes';

export type BaseModal = {
  id: string,
  modalType: string,
}

export type DeleteFileModalType = BaseModal & {
  modalType: 'deleteFile',
  action(): typeof undefined,
  files: Array<FileType>,
};

export type LinkBeocatWizardModalType = BaseModal & {
  modalType: 'linkBeocatWizard',
};

export type MakeDirectoryModalType = BaseModal & {
  modalType: 'makeDirectory',
  action(string): typeof undefined,
};

export type MoveCopyModalType = BaseModal & {
  modalType: 'moveCopyFile',
  action(string, string): typeof undefined,
  title: string,
  files: Array<FileType>,
  promptVerb: string,
  submitText: string,
  path: string,
  systemName: string,
};

export type RenameFileModalType = BaseModal & {
  modalType: 'renameFile',
  action(string, string): typeof undefined,
  fileName: string,
};

export type SuccessMessageModalType = BaseModal & {
  modalType: 'successMessage',
  text: string,
}

export type TransferModalType = BaseModal & {
  modalType: 'transfer',
  action(string): typeof undefined,
  files: Array<FileType>,
}
