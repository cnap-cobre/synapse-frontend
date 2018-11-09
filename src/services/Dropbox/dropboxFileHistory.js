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

const fileHistory = (csrftoken, path) => {
  dbx(csrftoken).filesListRevisions({
    path: '/' + path.split('/').slice(3).join('/')
  });
};

export default {
  fileHistory
};