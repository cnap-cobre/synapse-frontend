import {START_TRANSFER} from "../actions/transferFiles";

export const initialTransferState = {
};

export default function transferFiles(state = initialTransferState, action) {
  switch (action.type) {
    case START_TRANSFER:
      const filesBeingTransfered = action.fileList.reduce((acc, file) => {
        return acc;
      }, {});

      return {

      };
    default:
      return state;
  }
}