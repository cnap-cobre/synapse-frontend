import PropTypes from 'prop-types';

export default PropTypes.shape({
  share: PropTypes.func.isRequired,
  wget: PropTypes.func.isRequired,
  rename: PropTypes.func.isRequired,
  mv: PropTypes.func.isRequired,
  cp: PropTypes.func.isRequired,
  rm: PropTypes.func.isRequired
}).isRequired