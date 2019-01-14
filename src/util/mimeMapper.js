import mime from 'mime-types';

const lookup = (path) => {
  const result = mime.lookup(path);

  if (result) {
    return result;
  }

  if (path.match(/\.ipynb$/i)) {
    return 'application/jupyter-notebook';
  }

  if (path.match(/\.py$/i)) {
    return 'text/x-python';
  }

  if (path.match(/\.m$/i)) {
    return 'text/x-m';
  }

  if (path.match(/\.out$/i) && path.match(/slurm/i)) {
    return 'text/plain';
  }

  return false;
};

export default lookup;
