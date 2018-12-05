import { connect } from 'react-redux';
import FaTh from 'react-icons/lib/fa/th';
import FaThList from 'react-icons/lib/fa/th-list';
import PropTypes from 'prop-types';
import React from 'react';
import BootstrapSwitch from '../../BootstrapSwitch/BootstrapSwitch';
import { toggleFileViewFormat } from '../../../store/ui/visualOptions/VisualOptions';
import { getFileViewFormat } from '../../../store/ui/reducer';

class ListGridToggle extends React.Component {
  static propTypes = {
    enabled: PropTypes.bool.isRequired,
    onToggleClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <BootstrapSwitch
        enabledColor=""
        disabledColor="default"
        enabledLabel={(<FaTh />)}
        disabledLabel={(<FaThList />)}
        style={{
          marginTop: '8px',
          marginLeft: '1em',
        }}
        enabled={this.props.enabled}
        onToggleClick={this.props.onToggleClick}
      />
    );
  }
}

const mapStateToProps = store => ({
  enabled: getFileViewFormat(store),
});

const mapDispatchToProps = dispatch => ({
  onToggleClick: () => {
    dispatch(toggleFileViewFormat());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListGridToggle);
