const fileHistory = (file) => {
  const url = '/agave/files/v2/history/system/' + file.system + '/' + file.path;
};

export default {
  fileHistory
};