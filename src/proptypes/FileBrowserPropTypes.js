import PropTypes, {instanceOf} from 'prop-types';
import {Cookies} from "react-cookie";

export default {
  cookies: instanceOf(Cookies).isRequired,
  prefix: PropTypes.string.isRequired,
  system: PropTypes.string.isRequired,
  systemDisplayName: PropTypes.string.isRequired,
};