import {Dropbox} from 'dropbox';

const urlRemap = (url) => (
    url.replace('https://content.dropboxapi.com', '/dropbox/content')
        .replace('https://api.dropboxapi.com', '/dropbox/api')
        .replace('https://www.dropbox.com', '/dropbox')
);


const dbx = (csrftoken) => {
  const modifiedFetch = (url, init) => {
    return fetch(
        urlRemap(url),
        Object.assign({}, init, {
          headers: {
            ...init.headers,
            'X-CSRFToken': csrftoken
          }
        })
    );
  };
  return (
      new Dropbox({
        fetch: modifiedFetch
      })
  )
};

const fileHistory = (csrftoken, file) => {
  dbx(csrftoken).fileListRevisions({
    path: file.path
  });
};

export default {
  fileHistory
};