import {connect} from "react-redux";
import FileBreadcrumbs from './FileBreadcrumbs/FileBreadcrumbs';
import FileBrowserControls from "./FileBrowserControls/FileBrowserControls";
import FileBrowserGrid from "./FileBrowserGrid/FileBrowserGrid";
import FileBrowserList from "./FileBrowserList/FileBrowserList";
import { Link } from "redux-json-router";
import Loader from "../../Loader/Loader";
import PropTypes from 'prop-types';
import {push} from 'redux-json-router';
import React from 'react';
import {fetchFilesIfNeeded, invalidateFiles} from "../../../actions/files";


class FileBrowser extends React.Component {
  static propTypes = {
    system: PropTypes.shape({
      id: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired,
    prefix: PropTypes.string.isRequired,
    systemPrefix: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    showDotfiles: PropTypes.bool.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    handleRefresh: PropTypes.func.isRequired,
    fetchFiles: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    fileViewFormat: PropTypes.bool.isRequired,
  };

  shouldComponentUpdate(nextProps, nextState) {
    // No point in rendering if the tab isn't being shown.
    return nextProps.pathname.indexOf(
        nextProps.systemPrefix
    ) === 0;
  }

  render() {
    const FileViewComponent = (this.props.fileViewFormat ? FileBrowserGrid : FileBrowserList);

    return (
        <div className="card-content table-responsive table-full-width">
          <FileBreadcrumbs systemName={this.props.system.name}
                           prefix={this.props.systemPrefix}
                           pathname={this.props.pathname}
                           crumbComponent={Link}
          />

          <FileBrowserControls id={this.props.system.id}
                               handleRefresh={this.props.handleRefresh(this.props.path)}
                               showDotfiles={this.props.showDotfiles}
                               toggleDotfiles={this.props.toggleDotfiles}
          />

          <FileViewComponent showDotfiles={this.props.showDotfiles}
                           path={this.props.path}
                           handleFileClick={this.props.handleFileClick}
                           loading={this.props.loading}
                           error={this.props.error}
                           list={this.props.list}
          />

          <Loader visible={this.props.loading} />
        </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const filesAtPath = store.files[ownProps.path];

  const loading = (filesAtPath === undefined || filesAtPath.isFetching);
  const error = (!loading) && (filesAtPath.errorCode || !filesAtPath.hasFetched);
  const list = (loading || error) ? [] : filesAtPath.files;

  return {
    loading,
    error,
    list,
    fileViewFormat: store.visualOptions.fileViewFormat
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRefresh: (path) => () => {
      dispatch(invalidateFiles(path));
      setTimeout(() => dispatch(fetchFilesIfNeeded(path)), 20);
    },
    handleFileClick: (file) => {
      if (file.type === 'dir') {
        dispatch(push([
            '.',
            file.name,
            ''
        ].join('/')))
      }
    }
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileBrowser);