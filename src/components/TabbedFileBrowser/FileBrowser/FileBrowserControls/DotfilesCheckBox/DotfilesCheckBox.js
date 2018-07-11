import PropTypes from 'prop-types';
import React from "react";

export default class DotfilesCheckBox extends React.Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    showDotfiles: PropTypes.bool.isRequired,
    toggleDotfiles: PropTypes.func.isRequired
  };

  render(){
    return (
        <div className="checkbox">
          <input  checked={this.props.showDotfiles}
                  id={"DotfilesCheckbox" + this.props.id}
                  type="checkbox"
                  onChange={this.props.toggleDotfiles} />

          <label htmlFor={"DotfilesCheckbox" + this.props.id}>Show Dotfiles</label>
        </div>
    )
  }
}