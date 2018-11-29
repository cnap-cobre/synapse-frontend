// @flow

import React from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Link, push } from 'redux-json-router';
import pathUtil from 'path';
import FileBreadcrumbs from './FileBreadcrumbs/FileBreadcrumbs';
import FileBrowserControls from './FileBrowserControls/FileBrowserControls';
import FileBrowserGrid from './FileBrowserGrid/FileBrowserGrid';
import FileBrowserList from './FileBrowserList/FileBrowserList';
import Loader from '../../Loader/Loader';

import { setBrowserPath } from '../../../store/ui/browserPaths/BrowserPaths';

import {
  addFocusedFile, removeFocusedFile, setFocusedFile, setFocusedFilesList,
} from '../../../store/ui/focusedFiles/FocusedFiles';
import { getFileViewFormat, getFocusedFilePaths } from '../../../store/ui/reducer';
import { fileActions, fileListActions } from '../../../store/files/Files';
import type { FileSystemType } from '../../../types/fileSystemTypes';
import type { FileType } from '../../../types/fileTypes';

type Props = {
  system: FileSystemType,
  systemPrefix: string,
  path: string,
  pathname: string,
  showDotfiles: boolean,
  toggleDotfiles(): typeof undefined,
  loading: boolean,
  error: boolean,
  list: Array<FileType>,
  fileViewFormat: boolean,
  focusedFilePaths: Array<string>,
  uploadFile(File, string): typeof undefined,
  fetchFileList(string): typeof undefined
}

class FileBrowser extends React.Component<Props> {
  shouldComponentUpdate(nextProps) {
    // No point in rendering if the tab isn't being shown.
    return nextProps.pathname.indexOf(
      nextProps.systemPrefix,
    ) === 0;
  }

  handleRefresh = path => () => {
    const { fetchFileList } = this.props;
    fetchFileList(path);
  };

  handleContextMenu = (file) => {
    const { focusedFilePaths } = this.props;
    if (focusedFilePaths.indexOf(file.fullPath) === -1) {
      setFocusedFile(file.fullPath);
    }
  };

  handleDoubleClick = (file) => {
    const { system, path } = this.props;

    if (file.type === 'dir') {
      push([
        '.',
        file.name,
        '',
      ].join('/'));

      setBrowserPath(
        `${system.provider}.${system.id}`,
        `${pathUtil.resolve(path, file.name).slice(0)}/`,
      );
    }
  };

  handleSingleClick = (file, list, e) => {
    const { focusedFilePaths } = this.props;

    e.preventDefault();
    const selected = focusedFilePaths;

    if (e.ctrlKey) {
      // If we are already selected, remove from selection
      // Else, add to selection
      if (selected.indexOf(file.fullPath) !== -1) {
        return removeFocusedFile(file.fullPath);
      }
      return addFocusedFile(file.fullPath);
    }

    if (e.shiftKey && selected.length === 0) {
      // Revert to single click behavior
      e.ctrlKey = true;
      return this.handleSingleClick(file, list, e);
    }

    if (e.shiftKey && selected.length === 1 && selected[0] === file.fullPath) {
      // If we shift + click on the only selected file, do nothing.
      return null;
    }

    if (e.shiftKey) {
      const mostRecentSelection = selected.slice(-1)[0];
      const mostRecentSelectionIndex = list.findIndex(f => f.fullPath === mostRecentSelection);
      const currentSelectionIndex = list.findIndex(f => f.fullPath === file.fullPath);

      return setFocusedFilesList(
        list.map(f => f.fullPath).slice(
          Math.min(mostRecentSelectionIndex, currentSelectionIndex),
          Math.max(mostRecentSelectionIndex, currentSelectionIndex) + 1,
        ),
      );
    }

    return setFocusedFile(file.fullPath);
  };

  handleFileDropzone = (files) => {
    const { path, uploadFile } = this.props;

    // eslint-disable-next-line
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i], path);
    }
  };

  render() {
    const {
      system,
      systemPrefix,
      pathname,
      path,
      showDotfiles,
      toggleDotfiles,
      fileViewFormat,
      loading,
      error,
      list,
      focusedFilePaths,
    } = this.props;

    const FileViewComponent = (fileViewFormat ? FileBrowserGrid : FileBrowserList);

    return (
      <div className="card-content table-responsive table-full-width">
        <Dropzone
          style={{}}
          onDrop={this.handleFileDropzone}
          disableClick
        >
          <FileBreadcrumbs
            systemName={system.name}
            prefix={systemPrefix}
            pathname={pathname}
            crumbComponent={Link}
          />

          <FileBrowserControls
            id={system.id}
            handleRefresh={this.handleRefresh(path)}
            showDotfiles={showDotfiles}
            toggleDotfiles={toggleDotfiles}
            path={path}
          />

          <FileViewComponent
            showDotfiles={showDotfiles}
            path={path}
            handleContextMenu={this.handleContextMenu}
            handleDoubleClick={this.handleDoubleClick}
            handleSingleClick={this.handleSingleClick}
            loading={loading}
            error={error}
            list={list}
            focusedFilePaths={focusedFilePaths}
          />

          <Loader visible={loading} />
        </Dropzone>
      </div>
    );
  }
}

const mapStateToProps = (store, ownProps) => {
  const filesAtPath = store.files[ownProps.path];

  const loading = (filesAtPath === undefined || filesAtPath.loading);
  const list = (loading) ? [] : filesAtPath.files;

  return {
    loading,
    error: false, // TODO: fix this hack and actually handle errors
    list: list || [],
    fileViewFormat: getFileViewFormat(store),
    focusedFilePaths: getFocusedFilePaths(store),
  };
};

const mapDispatchToProps = {
  fetchFileList: fileListActions.pending,
  setFocusedFile,
  push,
  setBrowserPath,
  removeFocusedFile,
  addFocusedFile,
  setFocusedFilesList,
  uploadFile: fileActions.uploadFile,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FileBrowser);
