import PropagateLoader from 'react-spinners/PropagateLoader';
import PropTypes from 'prop-types';
import React from "react";
import './Loader.css';


export default class Loader extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  };

  render() {
    return (
        <div
            className="loader"
            style={{display: this.props.visible ? 'block' : 'none'}}>
          <PropagateLoader
              color={'#512888'}
              loading={this.props.visible}
          />
        </div>
    );
  };
}
