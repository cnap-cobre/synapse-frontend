export function initiateTransfer(csrftoken, fileList) {
  const data = {
    files: fileList,
  };

  return fetch('/api/v1/transfer_batches/', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json',
      'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify(data),
  }).then((res) => {
    const batch = res.json();
    console.log(batch);
  });
}

export function fetchUserProfile() {
  return fetch('/api/v1/profiles/me/', {
    credentials: 'same-origin',
  }).then(response => response.json());
}
