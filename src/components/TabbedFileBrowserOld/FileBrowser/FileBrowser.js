import FileBreadcrumbs from "./FileBreadcrumbs/FileBreadcrumbs";
import FileBrowserControls from "./FileBrowserControls/FileBrowserControls";
import FileBrowserList from "./FileBrowserList/FileBrowserList";
import HttpErrorMessage from "./HttpErrorMessage/HttpErrorMessage";
import Loader from "../../Loader/Loader";
import PropTypes from "prop-types";
import React from "react";


export default class FileBrowser extends React.Component {
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
          />


          <Loader visible={this.props.loading}/>
          <HttpErrorMessage visible={this.props.error}
                            errorObject={this.props.errorObject} />
        </div>
    );
  }
}