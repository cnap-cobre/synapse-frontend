// @flow
import PropagateLoader from 'react-spinners/PropagateLoader';
import PropTypes from 'prop-types';
import React from 'react';
import './Loader.css';

type Props = {
  visible: boolean
}

export default class Loader extends React.Component<Props> {
  render() {
    return (
      <div
        className="loader"
        style={{ display: this.props.visible ? 'block' : 'none' }}
      >
        <PropagateLoader
          color="#512888"
          loading={this.props.visible}
        />
      </div>
    );
  }
}
