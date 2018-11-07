import {connect} from "react-redux";
import Dropzone from 'react-dropzone';
import FileBreadcrumbs from './FileBreadcrumbs/FileBreadcrumbs';
import FileBrowserControls from "./FileBrowserControls/FileBrowserControls";
import FileBrowserGrid from "./FileBrowserGrid/FileBrowserGrid";
import FileBrowserList from "./FileBrowserList/FileBrowserList";
import { Link } from "redux-json-router";
import Loader from "../../Loader/Loader";
import path from 'path';
import PropTypes from 'prop-types';
import {push} from 'redux-json-router';
import React from 'react';
import {setBrowserPath} from "../../../store/BrowserPaths";
import {addFocusedFile, clearFocusedFiles, removeFocusedFile, setFocusedFile, setFocusedFilesList} from "../../../store/focusedFiles/actions";
import {fetchFilesIfNeeded, invalidateFiles, uploadFile} from "../../../store/files/actions";



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

  handleRefresh = (path) => () => {
    this.props.dispatch(invalidateFiles(path));
    setTimeout(() => this.props.dispatch(fetchFilesIfNeeded(path)), 20);
  };

  handleContextMenu = (file, e) => {
    if(this.props.focusedFilePaths.indexOf(file.fullPath) === -1) {
      this.props.dispatch(setFocusedFile(file.fullPath));
    }
  };

  handleDoubleClick = (file, e) => {
    if (file.type === 'dir') {
      this.props.dispatch(push([
        '.',
        file.name,
        ''
      ].join('/')));
      this.props.dispatch(setBrowserPath(
          this.props.system.provider + '.' + this.props.system.id,
          path.resolve(this.props.path, file.name).slice(0) + '/'
      ));
    }
  };

  handleSingleClick = (file, list, e) => {
    e.preventDefault();
    const selected = this.props.focusedFilePaths;

    if(e.ctrlKey) {
      // If we are already selected, remove from selection
      // Else, add to selection
      if(selected.indexOf(file.fullPath) !== -1) {
        return this.props.dispatch(removeFocusedFile(file.fullPath));
      } else {
        return this.props.dispatch(addFocusedFile(file.fullPath));
      }
    }

    if(e.shiftKey && selected.length === 0) {
      // Revert to single click behavior
      e.ctrlKey = true;
      return this.handleSingleClick(file, e);
    }

    if(e.shiftKey && selected.length === 1 && selected[0] === file.fullPath) {
      // If we shift + click on the only selected file, do nothing.
      return;
    }

    if(e.shiftKey) {
      const mostRecentSelection = selected.slice(-1)[0];
      const mostRecentSelectionIndex = list.findIndex((f) => f.fullPath === mostRecentSelection);
      const currentSelectionIndex = list.findIndex((f) => f.fullPath === file.fullPath);

      return this.props.dispatch(setFocusedFilesList(
          list.map(f => f.fullPath).slice(
              Math.min(mostRecentSelectionIndex, currentSelectionIndex),
              Math.max(mostRecentSelectionIndex, currentSelectionIndex) + 1
          )
      ));
    }

    return this.props.dispatch(setFocusedFile(file.fullPath));
  };

  handleFileDropzone = (files) => {
    console.log('DROPZONE', files);
    for (let i = 0; i < files.length; i++){
      this.props.dispatch(uploadFile(files[i], this.props.path));
    }
  };

  render() {
    const FileViewComponent = (this.props.fileViewFormat ? FileBrowserGrid : FileBrowserList);

    return (
        <div className="card-content table-responsive table-full-width">
          <Dropzone style={{}}
                    onDrop={this.handleFileDropzone}
                    disableClick={true}
          >
          <FileBreadcrumbs systemName={this.props.system.name}
                           prefix={this.props.systemPrefix}
                           pathname={this.props.pathname}
                           crumbComponent={Link}
          />

          <FileBrowserControls id={this.props.system.id}
                               handleRefresh={this.handleRefresh(this.props.path)}
                               showDotfiles={this.props.showDotfiles}
                               toggleDotfiles={this.props.toggleDotfiles}
                               path={this.props.path}
          />

          <FileViewComponent showDotfiles={this.props.showDotfiles}
                             path={this.props.path}
                             handleContextMenu={this.handleContextMenu}
                             handleDoubleClick={this.handleDoubleClick}
                             handleSingleClick={this.handleSingleClick}
                             loading={this.props.loading}
                             error={this.props.error}
                             list={this.props.list}
                             focusedFilePaths={this.props.focusedFilePaths}
          />

          <Loader visible={this.props.loading} />
          </Dropzone>
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
    fileViewFormat: store.visualOptions.fileViewFormat,
    focusedFilePaths: store.focusedFiles.list
  };
};

export default connect(
    mapStateToProps
)(FileBrowser);