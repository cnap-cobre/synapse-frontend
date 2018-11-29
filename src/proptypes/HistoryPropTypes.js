import PropTypes from 'prop-types';

export default PropTypes.shape({
  length: PropTypes.number.isRequired,
  location: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
}).isRequired;
