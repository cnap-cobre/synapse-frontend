import agaveFileActions from './agaveFileActions';
import agaveFileHistory from './agaveFileHistory';
import agaveFileSystems from './agaveFileSystems';

export default {
  ...agaveFileActions,
  ...agaveFileHistory,
  ...agaveFileSystems
};