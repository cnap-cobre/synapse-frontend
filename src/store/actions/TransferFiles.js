import * as types from '../private/transferFiles/types';

export const receiveTransferResponse = (fileBatch) => ({
  type: types.RECEIVE_TRANSFER_RESPONSE,
  fileBatch
});

export const startTransfer = (fileList) => ({
  type: types.START_TRANSFER,
  fileList
});