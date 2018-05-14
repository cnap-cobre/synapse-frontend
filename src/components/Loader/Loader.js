import React, {Component} from "react";
import {PropagateLoader} from 'react-spinners';

import './Loader.css';

export default class Lader extends Component {
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