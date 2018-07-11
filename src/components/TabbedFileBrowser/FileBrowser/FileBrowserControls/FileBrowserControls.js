import React, { Component } from "react";
import PropTypes from 'prop-types';
import DotfilesCheckBox from "./DotfilesCheckBox/DotfilesCheckBox";
import BrowserRefresh
  from "./BrowserRefresh/BrowserRefresh";

export default class FileBrowserControls extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    showDotfiles: PropTypes.bool.isRequired,
    toggleDotfiles: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="browserControls" style={{
        padding: "1px 15px",
        backgroundColor: "#e4e4e4",
        borderRadius: "4px",
        textAlign: "left",
        marginBottom: "20px",
        display: "flex",
        flexDirection: "row"
      }}>
        <DotfilesCheckBox id={this.props.id}
                          showDotfiles={this.props.showDotfiles}
                          toggleDotfiles={this.props.toggleDotfiles} />
        <BrowserRefresh handleRefresh={() => {alert('Impliment me')}}/>
      </div>
    );
  }
}