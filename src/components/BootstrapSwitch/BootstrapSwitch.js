// @flow

import * as React from 'react';
import './bootstrap-switch.css';

type Props = {
  style?: any,
  enabledColor: string,
  disabledColor: string,
  enabledLabel: React.Node,
  disabledLabel: React.Node,
  enabled: boolean,
  onToggleClick(): typeof undefined,
}

const BootstrapSwitch = (props: Props) => {
  const {
    style, enabledColor, disabledColor, enabledLabel, disabledLabel, enabled, onToggleClick,
  } = props;

  return (
    <div
      className={
            `${'bootstrap-switch bootstrap-switch-animate bootstrap-switch-wrapper '
            + 'bootstrap-switch-'}${enabled ? 'on' : 'off'}`
          }
      style={Object.assign({ width: '72px' }, style)}
      onClick={onToggleClick}
    >
      <div
        className="bootstrap-switch-container"
        style={{
          width: '122px',
          marginLeft: enabled ? '0px' : '-50px',
        }}
      >
        <span
          className={`bootstrap-switch-handle-on bootstrap-switch-${enabledColor}`}
          style={{
            width: '50px',
          }}
        >
          {enabledLabel}
        </span>
        <span
          className="bootstrap-switch-label"
          style={{
            width: '26px',
          }}
        >
              &nbsp;
        </span>
        <span
          className={`bootstrap-switch-handle-off bootstrap-switch-${disabledColor}`}
          style={{
            width: '50px',
          }}
        >
          {disabledLabel}
        </span>
        <input type="checkbox" className="switch-icon" />
      </div>
    </div>
  );
};

BootstrapSwitch.defaultProps = {
  style: {},
};

export default BootstrapSwitch;
