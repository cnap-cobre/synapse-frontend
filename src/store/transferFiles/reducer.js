import { START_TRANSFER } from './types';

export const initialTransferState = {
};

export default function transferFiles(state = initialTransferState, action) {
  switch (action.type) {
    case START_TRANSFER: {
      const filesBeingTransfered = action.fileList.reduce((acc, file) => acc, {});
      return state;
    }
    default:
      return state;
  }
}
