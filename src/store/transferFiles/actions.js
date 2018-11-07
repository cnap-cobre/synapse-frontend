export const START_TRANSFER = 'START_TRANSFER';
export const RECEIVE_TRANSFER_RESPONSE = 'RECEIVE_TRANSFER_RESPONSE';

export function startTransfer(fileList) {
  const action = (dispatch, getState) => {
    const csrftoken = getState().csrf.token;
    const data = {
      files: fileList
    };
    return fetch('/api/v1/transfer_batches/', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'content-type': 'application/json',
        'X-CSRFToken': csrftoken
      },
      body: JSON.stringify(data)
    }).then((res) => {
      const batch = res.json();
      console.log(batch);
      //dispatch(receiveTransferResponse(batch));
    });
  };
  action.type = START_TRANSFER;
  return action;
}

export function receiveTransferResponse(fileBatch) {
  return {
    type: RECEIVE_TRANSFER_RESPONSE,
    fileBatch
  };
}