import { START_TRANSFER } from './types';

export const initialTransferState = {
};

export default function transferFiles(state = initialTransferState, action) {
  switch (action.type) {
    case START_TRANSFER: {
      // TODO: Add file transfer batch to state
      // const filesBeingTransfered = action.fileList.reduce((acc, file) => [], {});
      // console.log(filesBeingTransfered);
      return state;
    }
    default:
      return state;
  }
}
