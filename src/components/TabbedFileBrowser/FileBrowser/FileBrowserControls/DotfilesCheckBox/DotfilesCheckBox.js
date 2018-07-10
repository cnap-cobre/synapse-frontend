import React, { Component } from "react";
import PropTypes from 'prop-types';



export default class DotfilesCheckBox extends Component {

  static propTypes = {
     showDotfiles: PropTypes.bool.isRequired,
     toggleDotfiles: PropTypes.func.isRequired
  };

  render(){
    return (
      <div className="checkbox">
         <input  checked={this.props.showDotfiles} 
                 id="DotfilesCheckbox" 
                 type="checkbox" 
                 onChange={this.props.toggleDotfiles} />

         <label htmlFor="DotfilesCheckbox">Show Dotfiles</label>
      </div>
    )
  }
}