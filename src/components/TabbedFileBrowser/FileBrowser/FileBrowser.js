import React, { Component } from "react";

import HttpErrorMessage from "./HttpErrorMessage/HttpErrorMessage";
import Loader from "../../Loader/Loader";
import FileBreadcrumbs from "./FileBreadcrumbs/FileBreadcrumbs";
import FileBrowserList from "./FileBrowserList/FileBrowserList";

import FileBrowserControls from "./FileBrowserControls/FileBrowserControls";

import PropTypes from "prop-types";
import HistoryPropTypes from '../../../proptypes/HistoryPropTypes';
import FileActionsServicePropTypes from '../../../proptypes/FileActionsServicePropTypes';

export default class FileBrowser extends Component {
  static propTypes = {
    prefix: PropTypes.string.isRequired,
    systemDisplayName: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    error: PropTypes.bool.isRequired,
    errorObject: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    showDotfiles: PropTypes.bool.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    handleFileClick: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    history: HistoryPropTypes,
    fileActionsService: FileActionsServicePropTypes
  };


  render() {
    return (
        <div className="card-content table-responsive table-full-width">
          <FileBreadcrumbs systemDisplayName={this.props.systemDisplayName}
                           history={this.props.history}
                           prefix={this.props.prefix}
                           style={{marginBottom: "0px"}}
          />

          <FileBrowserControls toggleDotfiles={this.props.toggleDotfiles}
                               showDotfiles={this.props.showDotfiles}
                               handleRefresh={this.props.handleRefresh}
          />

          <FileBrowserList list={this.props.list}
                           error={this.props.error}
                           loading={this.props.loading}
                           showDotfiles={this.props.showDotfiles}
                           handleFileClick={this.props.handleFileClick}
                           fileActionsService={this.props.fileActionsService}
          />


          <Loader visible={this.props.loading}/>
          <HttpErrorMessage visible={this.props.error}
                            errorObject={this.props.errorObject} />
        </div>
    );
  }
}