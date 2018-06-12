import React, { Component } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../../Loader/Loader";
import FileBreadcrumbs from "../FileBreadcrumbs/FileBreadcrumbs";
import FileBrowserList from "../FileBrowserList/FileBrowserList";
import PropTypes from "prop-types";

export default class FileBrowser extends Component {
  static propTypes = {
    prefix: PropTypes.string.isRequired,
    systemDisplayName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    showDotfiles: PropTypes.bool.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    handleFileClick: PropTypes.func.isRequired,
    history: PropTypes.shape({
      length: PropTypes.number.isRequired,
      location: PropTypes.object.isRequired,
      action: PropTypes.string.isRequired,
    }).isRequired
  };


  render() {
    return (
        <div className="card-content table-responsive table-full-width">
          <FileBreadcrumbs systemDisplayName={this.props.systemDisplayName}
                           history={this.props.history}
                           prefix={this.props.prefix}
                           style={{marginBottom: "0px"}}
          />
          <div className="browserControls" style={{
            padding: "1px 15px",
            backgroundColor: "#e4e4e4",
            borderRadius: "4px",
            textAlign: "left",
            marginBottom: "20px"
          }}>
            <div className="checkbox">
              <input id="dotFilesCheckbox" type="checkbox" onChange={this.props.toggleDotfiles} />
              <label htmlFor="dotFilesCheckbox">Show Dotfiles</label>
            </div>
          </div>


          <FileBrowserList list={this.props.list}
                           error={this.props.error}
                           loading={this.props.loading}
                           showDotfiles={this.props.showDotfiles}
                           handleFileClick={this.props.handleFileClick} />


          <Loader visible={this.props.loading}/>
          <ErrorMessage visible={this.props.error} message={this.props.errorMessage}/>
        </div>
    );
  }
}