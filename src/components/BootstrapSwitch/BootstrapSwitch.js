import PropTypes from 'prop-types';
import React from 'react';
import './bootstrap-switch.css';

export default class BootstrapSwitch extends React.Component {
  static propTypes = {
    onEnable: PropTypes.func,
    onDisable: PropTypes.func,
    style: PropTypes.object,
    enabledColor: PropTypes.string,
    disabledColor: PropTypes.string,
    enabled: PropTypes.bool.isRequired,
    onToggleClick: PropTypes.func.isRequired
  };

  static defaultProps = {
    style: {}
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className={
               "bootstrap-switch bootstrap-switch-animate bootstrap-switch-wrapper "
               + "bootstrap-switch-" + (this.props.enabled ? 'on' : 'off')
             }
             style={Object.assign({width: '72px'}, this.props.style)}
             onClick={this.props.onToggleClick}
        >
          <div className="bootstrap-switch-container"
               style={{
                 width: '122px',
                 marginLeft: this.props.enabled ? '0px' : '-50px'
               }}
          >
            <span className={"bootstrap-switch-handle-on bootstrap-switch-" + this.props.enabledColor}
                  style={{
                    width: '50px'
                  }}
            >
              {this.props.enabledLabel}
            </span>
            <span className="bootstrap-switch-label"
                  style={{
                    width: '26px'
                  }}
            >
              &nbsp;
            </span>
            <span className={"bootstrap-switch-handle-off bootstrap-switch-" + this.props.disabledColor}
                  style={{
                    width: '50px'
                  }}
            >
              {this.props.disabledLabel}
            </span>
            <input type="checkbox" className="switch-icon" />
          </div>
        </div>
    );
  }
}