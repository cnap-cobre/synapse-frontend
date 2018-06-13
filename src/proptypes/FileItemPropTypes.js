import PropTypes from "prop-types";

export default PropTypes.shape({
  format: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
}).isRequired