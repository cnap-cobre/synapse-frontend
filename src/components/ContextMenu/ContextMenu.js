// @flow
import { connect } from 'react-redux';
import EventListener from 'react-event-listener';
import React from 'react';
import { addModal } from '../../store/ui/modals/Modals';
import { startTransfer } from '../../store/transferFiles/TransferFiles';
import { fileActions, fileListActions } from '../../store/files/Files';
import './ContextMenu.scss';
import { getFocusedFilePaths } from '../../store/ui/reducer';
import DownloadLink from './DownloadLink';
import type { FileType } from '../../types/fileTypes';

type Props = {
  focusedFiles: Array<FileType>,
  focusedFilePaths: Array<string>,
  dispatch(any): typeof undefined,
}

type State = {
  visible: boolean
}

class ContextMenu extends React.Component<Props, State> {
  state = {
    visible: false,
  };

  root: HTMLElement | null = null;

  _eventPathContainsClass = (event, className) => event.path.map(
    element => element.className,
  ).filter(cn => cn) // Remove undefined values or any other "falsey" values
    .map(
      // Check if the supplied className is found in the element's className property
      cn => (typeof cn === 'string') && cn.indexOf(className) !== -1,
    ).includes(true);

  _handleContextMenu = (event) => {
    // console.log("context target", event.currentTarget);
    // console.log("event", event);
    // console.log("classDetection", this._eventPathContainsClass(event, "rightClickableFile"));
    if (!this._eventPathContainsClass(event, 'rightClickableFile')) {
      return;
    }

    event.preventDefault();

    this.setState({ visible: true });

    if (this.root === null) {
      return;
    }

    const clickX = event.clientX;
    const clickY = event.clientY;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    const rootW = this.root.offsetWidth;
    const rootH = this.root.offsetHeight;

    const right = (screenW - clickX) > rootW;
    const left = !right;
    const top = (screenH - clickY) > rootH;
    const bottom = !top;

    if (right) {
      this.root.style.left = `${clickX + 5}px`;
    }

    if (left) {
      this.root.style.left = `${clickX - rootW - 5}px`;
    }

    if (top) {
      this.root.style.top = `${clickY + 5}px`;
    }

    if (bottom) {
      this.root.style.top = `${clickY - rootH - 5}px`;
    }
  };

  _handleClick = (event) => {
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.root);

    if (wasOutside && visible) this.setState({ visible: false });

    return true;
  };

  _handleScroll = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false });
  };

  delayedRefresh = (path) => {
    const { dispatch } = this.props;
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      dispatch(fileListActions.pending(path));
    }, 200);
  };

  handleSingleShareFile = () => {
    console.log('share');
  };

  handleMultiShareFile = () => {
    console.log('share');
  };

  handleTransferFiles = () => {
    const { focusedFiles, dispatch } = this.props;
    dispatch(addModal({
      modalType: 'transfer',
      files: focusedFiles,
      action: (targetPath) => {
        const transferOrders = focusedFiles.map(
          // Files get no trailing slash (obviously)
          // Directories must get a trailing slash
          file => ({
            fromPath: file.fullPath + (file.type === 'dir' ? '/' : ''),
            toPath: targetPath + file.name + (file.type === 'dir' ? '/' : ''),
          }),
        );
        dispatch(
          startTransfer(transferOrders),
        );
      },
    }));
  };

  handleRenameFile = () => {
    const { dispatch, focusedFiles } = this.props;
    const file = focusedFiles[0];
    dispatch(addModal({
      modalType: 'renameFile',
      fileName: file.name,
      action: (newName) => {
        dispatch(
          fileActions.renameFile(file, newName),
        );
        this.delayedRefresh(`${file.fullPath.split('/').slice(0, -1).join('/')}/`);
      },
    }));
  };

  handleMoveFile = () => {
    const { dispatch, focusedFiles } = this.props;
    const currentDirectoryPath = `${focusedFiles[0]
      .fullPath.split('/').slice(0, -1).join('/')}/`;

    dispatch(addModal({
      modalType: 'moveCopyFile',
      title: `Move File${focusedFiles.length > 1 ? 's' : ''}`,
      files: focusedFiles,
      promptVerb: 'move',
      submitText: 'Move Here',
      path: currentDirectoryPath,
      systemName: focusedFiles[0].system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...currentDirectoryPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          '',
        ].join('/');

        // Copy each file
        Promise.all(
          focusedFiles.map(
            (file) => {
              console.log(file, newPath);
              return fileActions.moveFile(file, `${newPath}/${file.name}`);
            },
          ).map(
            moveAction => dispatch(moveAction),
          ),
        )

        // ... then refresh each affected directory
          .then(() => {
            this.delayedRefresh(currentDirectoryPath);
            this.delayedRefresh(newDirectoryPath);
          });
      },
    }));
  };

  handleCopyFiles = () => {
    const { dispatch, focusedFiles } = this.props;
    const currentDirectoryPath = `${focusedFiles[0]
      .fullPath.split('/').slice(0, -1).join('/')}/`;

    dispatch(addModal({
      modalType: 'moveCopyFile',
      title: `Copy File${focusedFiles.length > 1 ? 's' : ''}`,
      files: focusedFiles,
      promptVerb: 'copy',
      submitText: 'Copy Here',
      path: currentDirectoryPath,
      systemName: focusedFiles[0].system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...currentDirectoryPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          '',
        ].join('/');

        // Copy each file
        Promise.all(
          focusedFiles.map(
            file => fileActions.copyFile(file, newPath + file.name),
          ).map(
            copyAction => dispatch(copyAction),
          ),
        )

        // ... then refresh each affected directory
          .then(() => {
            this.delayedRefresh(newDirectoryPath);
          });
      },
    }));
  };

  handleDeleteFiles = () => {
    const { dispatch, focusedFiles } = this.props;
    dispatch(addModal({
      modalType: 'deleteFile',
      files: focusedFiles,
      action: () => {
        const uniqueDirectories = focusedFiles.map(
          // Map from files to their directory paths
          file => `${file.fullPath.split('/').slice(0, -1).join('/')}/`,
        ).filter(
          // Get unique
          (x, i, a) => a.indexOf(x) === i,
        );

        // Delete each file
        Promise.all(
          focusedFiles.map(
            file => fileActions.deleteFile(file),
          ).map(
            deleteAction => dispatch(deleteAction),
          ),
        )

        // ..then refresh each of their containing directories
          .then(() => {
            console.log(uniqueDirectories);
            uniqueDirectories.forEach(
              directoryPath => this.delayedRefresh(directoryPath),
            );
          });
      },
    }));
  };

  singleFileContextMenu = () => {
    const { focusedFiles } = this.props;
    return (
      <React.Fragment>
        <div
          className="contextMenu--option contextMenu--option__disabled"
          onClick={this.handleSingleShareFile}
        >
            Share (coming soon)
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleTransferFiles}
        >
            Transfer
        </div>
        <DownloadLink
          file={focusedFiles[0]}
          disabled={focusedFiles[0].type === 'dir'}
        >
            Download
        </DownloadLink>
        <div
          className="contextMenu--option"
          onClick={this.handleRenameFile}
        >
            Rename
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleMoveFile}
        >
            Move
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleCopyFiles}
        >
            Copy
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleDeleteFiles}
        >
            Delete
        </div>
      </React.Fragment>
    );
  }

  multipleFileContextMenu = () => {
    const { focusedFiles } = this.props;
    return (
      <React.Fragment>
        <div
          className="contextMenu--option contextMenu--option__diabled"
          onClick={this.handleMultiShareFile}
        >
            Share (coming soon)
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleTransferFiles}
        >
            Transfer
        </div>
        <DownloadLink
          file={focusedFiles[0]}
          disabled
        >
            Download
        </DownloadLink>
        <div
          className="contextMenu--option"
          onClick={this.handleMoveFile}
        >
            Move
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleCopyFiles}
        >
            Copy
        </div>
        <div
          className="contextMenu--option"
          onClick={this.handleDeleteFiles}
        >
            Delete
        </div>
      </React.Fragment>
    );
  }

  render() {
    const { visible } = this.state;
    const { focusedFilePaths } = this.props;

    return (
      <div>
        <EventListener
          target="window"
          onScroll={this._handleScroll}
          onClick={this._handleClick}
          onContextMenu={this._handleContextMenu}
        >
          {(visible || null) && (
            <div
              ref={(ref) => { this.root = ref; }}
              className="contextMenu"
            >
              {
                focusedFilePaths.length === 1
                  ? this.singleFileContextMenu()
                  : this.multipleFileContextMenu()
              }
            </div>
          )}
        </EventListener>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  focusedFilePaths: getFocusedFilePaths(store),
  focusedFiles: getFocusedFilePaths(store).map(f => store.filesFlat[f]),
});


export default connect(mapStateToProps)(ContextMenu);
