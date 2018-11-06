import agaveFileActions from './agaveFileActions';
import agaveFileSystems from './agaveFileSystems';
import agaveFileHistory from './agaveFileHistory';

export default {
  ...agaveFileActions,
  ...agaveFileSystems,
  ...agaveFileHistory
};