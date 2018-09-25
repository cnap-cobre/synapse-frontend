import {addModal} from "../../../actions/modals";
import {connect} from 'react-redux';
import React from 'react';
import {ContextMenu, Item, Separator, Submenu } from 'react-contexify';
import {copyFile, deleteFile, fetchFilesIfNeeded,
  invalidateFiles, moveFile, renameFile} from "../../../actions/files";
import 'react-contexify/dist/ReactContexify.min.css';

const DownloadLink = (props) => {
  return (
      <div className="react-contexify__item">
      <a className="react-contexify__item__data"
         download
         href={props.dataFromProvider.file._links.self.href}
      >
        {props.children}
      </a>
      </div>
  );
};

class FileActionsMenu extends React.Component{
  // See https://github.com/fkhadra/react-contexify for the
  // expected method signature of the onClick method.
  // i.e. single object with {event, ref, data, dataFromProvider}

  static noOpAndStopClickPropagation({event, ref, data, dataFromProvider}) {
    event.stopPropagation();
  }

  stopClickPropagation = (action) => ({event, ref, data, dataFromProvider}) => {
    event.stopPropagation();
    action(dataFromProvider);
  };

  delayedRefresh = (path) => () => {
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      this.props.dispatch(invalidateFiles(path));
      this.props.dispatch(fetchFilesIfNeeded(path));
    }, 200);
  };

  handleShareFile = () => {console.log('share')};

  handleRenameFile = (refProps) => {
    this.props.dispatch(addModal({
      modalType: 'renameFile',
      fileName: refProps.fileName,
      action: (newName) => {
        this.props.dispatch(
            renameFile(refProps.file, newName)
        ).then(this.delayedRefresh(refProps.dirPath));
      }
    }));
  };

  handleMoveFile = (refProps) => {
    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Move ' + refProps.fileName,
      fileName: refProps.fileName,
      prompt: 'Select a new location for ' + refProps.fileName,
      submitText: 'Move',
      path: refProps.dirPath,
      systemName: refProps.file.system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...refProps.dirPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        this.props.dispatch(
            moveFile(refProps.file, newPath)
        )
            .then(this.delayedRefresh(refProps.dirPath))
            .then(this.delayedRefresh(newDirectoryPath))
      }
    }));
  };

  handleCopyFile = (refProps) => {
    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Copy ' + refProps.fileName,
      fileName: refProps.fileName,
      prompt: 'Select a location to copy ' + refProps.fileName,
      submitText: 'Copy',
      path: refProps.dirPath,
      systemName: refProps.file.system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...refProps.dirPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        this.props.dispatch(
            copyFile(refProps.file, newPath)
        ).then(this.delayedRefresh(refProps.dirPath))
            .then(this.delayedRefresh(newDirectoryPath))
      }
    }));
  };

  handleDeleteFile = (refProps) => {
    this.props.dispatch(addModal({
      modalType: 'deleteFile',
      fileName: refProps.fileName,
      action: () => {
        this.props.dispatch(
            deleteFile(refProps.file)
        )
            .then(this.delayedRefresh(refProps.dirPath));
      }
    }));
  };

  render = () => {
    return (
        <ContextMenu id="fileActionsMenu" style={{zIndex: '101'}}>
          <Item
              onClick={this.stopClickPropagation(this.handleShareFile)}
          >
            Share
          </Item>
          <DownloadLink>
            Download
          </DownloadLink>
          <Item
              onClick={this.stopClickPropagation(this.handleRenameFile)}
          >
            Rename
          </Item>
          <Item
              onClick={this.stopClickPropagation(this.handleMoveFile)}
          >
            Move
          </Item>
          <Item
              onClick={this.stopClickPropagation(this.handleCopyFile)}
          >
            Copy
          </Item>
          <Item
              onClick={this.stopClickPropagation(this.handleDeleteFile)}
          >
            Delete
          </Item>
        </ContextMenu>
    );
  };
}

export default connect()(FileActionsMenu);
