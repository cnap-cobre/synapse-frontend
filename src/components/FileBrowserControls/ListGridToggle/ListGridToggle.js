// @flow

import { connect } from 'react-redux';
import { FaTh, FaThList } from 'react-icons/fa';
import React from 'react';
import BootstrapSwitch from '../../BootstrapSwitch/BootstrapSwitch';
import { toggleFileViewFormat } from '../../../store/ui/visualOptions/VisualOptions';
import { getFileViewFormat } from '../../../store/ui/reducer';

type Props = {
  enabled: boolean,
  $onToggleClick(): void,
}

const ListGridToggle = (props: Props) => {
  const { enabled, $onToggleClick } = props;
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
      enabled={enabled}
      onToggleClick={$onToggleClick}
    />
  );
};

const mapStateToProps = store => ({
  enabled: getFileViewFormat(store),
});

const mapDispatchToProps = {
  $onToggleClick: toggleFileViewFormat,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListGridToggle);
