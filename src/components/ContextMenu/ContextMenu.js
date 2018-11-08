import {addModal} from "../../store/Modals";
import {connect} from 'react-redux';
import EventListener from 'react-event-listener';
import React from 'react';
import {startTransfer} from "../../store/TransferFiles";
import {copyFile, deleteFile, fetchFilesIfNeeded,
  invalidateFiles, moveFile, renameFile} from "../../store/files/actions";
import './ContextMenu.scss';

const DownloadLink = (props) => {
  return (
      <a className={"contextMenu--option " + (props.disabled ? "contextMenu--option__disabled": "")}
         download
         href={props.disabled ? "" : props.file._links.self.href}
      >
        {props.children}
        {props.disabled && <span>&nbsp; (not yet supported)</span>}
      </a>
  );
};

class ContextMenu extends React.Component {
  state = {
    visible: false,
  };

  _eventPathContainsClass = (event, className) => {
    return event.path.map(
        (element) => element.className
    ).filter(cn => cn) // Remove undefined values or any other "falsey" values
     .map(
         // Check if the supplied className is found in the element's className property
         (cn) => (typeof cn === 'string') && cn.indexOf(className) !== -1
     ).includes(true);
  };

  _handleContextMenu = (event) => {
    // console.log("context target", event.currentTarget);
    // console.log("event", event);
    // console.log("classDetection", this._eventPathContainsClass(event, "rightClickableFile"));
    if(!this._eventPathContainsClass(event, "rightClickableFile")) {
      return;
    }
    event.preventDefault();

    this.setState({ visible: true });

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
    console.log("Click event", event);
    const { visible } = this.state;
    const wasOutside = !(event.target.contains === this.root);

    if (wasOutside && visible) this.setState({ visible: false, });

    return true;
  };

  _handleScroll = () => {
    const { visible } = this.state;

    if (visible) this.setState({ visible: false, });
  };

  delayedRefresh = (path) => {
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      this.props.dispatch(invalidateFiles(path));
      this.props.dispatch(fetchFilesIfNeeded(path));
    }, 200);
  };

  handleSingleShareFile = (e) => {
    console.log('share');
  };

  handleTransferFiles = (e) => {
    const {focusedFiles} = this.props;
    this.props.dispatch(addModal({
      modalType: 'transfer',
      files: focusedFiles,
      action: (targetPath) => {
        console.log("TARGET PATH", targetPath);
        console.log("USING THESE FILES", focusedFiles);
        const transferOrders = focusedFiles.map(
            // Files get no trailing slash (obviously)
            // Directories must get a trailing slash
            file => ({
              fromPath: file.fullPath + (file.type === 'dir' ? '/' : ''),
              toPath: targetPath + file.name + (file.type === 'dir' ? '/' : '')
            })
        );
        this.props.dispatch(
            startTransfer(transferOrders)
        );

        console.log("Transfer Orders", transferOrders);
      }
    }));
  };

  handleRenameFile = (e) => {
    const file = this.props.focusedFiles[0];
    this.props.dispatch(addModal({
      modalType: 'renameFile',
      fileName: file.name,
      action: (newName) => {
        this.props.dispatch(
            renameFile(file, newName)
        ).then(
            () => this.delayedRefresh(file.fullPath.split('/').slice(0,-1).join('/') + '/'))
      }
    }));
  };

  handleMoveFile = (e) => {
    const {focusedFiles} = this.props;
    const currentDirectoryPath = focusedFiles[0]
        .fullPath.split('/').slice(0,-1).join('/') + '/';

    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Move File' + (focusedFiles.length > 1 ? 's' : ''),
      files: focusedFiles,
      promptVerb: 'move',
      submitText: 'Move Here',
      path: currentDirectoryPath,
      systemName: focusedFiles[0].system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...currentDirectoryPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        // Copy each file
        Promise.all(
            focusedFiles.map(
                file => {
                  console.log(file, newPath);
                  return moveFile(file, newPath + '/' + file.name)
                }
            ).map(
                moveAction => this.props.dispatch(moveAction)
            )
        )

        // ... then refresh each affected directory
        .then(() => {
          this.delayedRefresh(currentDirectoryPath);
          this.delayedRefresh(newDirectoryPath);
        });
      }
    }));
  };

  handleCopyFiles = (e) => {
    const {focusedFiles} = this.props;
    const currentDirectoryPath = focusedFiles[0]
        .fullPath.split('/').slice(0,-1).join('/') + '/';

    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Copy File' + (focusedFiles.length > 1 ? 's' : ''),
      files: focusedFiles,
      promptVerb: 'copy',
      submitText: 'Copy Here',
      path: currentDirectoryPath,
      systemName: focusedFiles[0].system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...currentDirectoryPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        // Copy each file
        Promise.all(
            focusedFiles.map(
                file => copyFile(file, newPath + '/' + file.name)
            ).map(
                copyAction => this.props.dispatch(copyAction)
            )
        )

        // ... then refresh each affected directory
        .then(() => {
          this.delayedRefresh(newDirectoryPath);
        });
      }
    }));
  };

  handleDeleteFiles = (e) => {
    this.props.dispatch(addModal({
      modalType: 'deleteFile',
      files: this.props.focusedFiles,
      action: () => {
        const uniqueDirectories = this.props.focusedFiles.map(
            // Map from files to their directory paths
            file => file.fullPath.split('/').slice(0,-1).join('/') + '/'
        ).filter(
            // Get unique
            (x,i,a) => a.indexOf(x) == i
        );

        // Delete each file
        Promise.all(
            this.props.focusedFiles.map(
                file => deleteFile(file)
            ).map(
                deleteAction => this.props.dispatch(deleteAction)
            )
        )

        // ..then refresh each of their containing directories
        .then(() => {
          console.log(uniqueDirectories);
          uniqueDirectories.forEach(
              (directoryPath) => this.delayedRefresh(directoryPath)
          )
        });
      }
    }));
  };

  singleFileContextMenu = () => (
      <React.Fragment>
        <div className="contextMenu--option contextMenu--option__disabled"
             onClick={this.handleSingleShareFile}
        >
          Share (coming soon)
        </div>
        <div className="contextMenu--option"
             onClick={this.handleTransferFiles}
        >
          Transfer
        </div>
        <DownloadLink file={this.props.focusedFiles[0]}
                      disabled={this.props.focusedFiles[0].type === 'dir'}
        >
          Download
        </DownloadLink>
        <div className="contextMenu--option"
             onClick={this.handleRenameFile}
        >
          Rename
        </div>
        <div className="contextMenu--option"
             onClick={this.handleMoveFile}
        >
          Move
        </div>
        <div className="contextMenu--option"
             onClick={this.handleCopyFiles}
        >
          Copy
        </div>
        <div className="contextMenu--option"
             onClick={this.handleDeleteFiles}
        >
          Delete
        </div>
      </React.Fragment>
  );

  multipleFileContextMenu = () => (
      <React.Fragment>
        <div className="contextMenu--option contextMenu--option__diabled"
             onClick={this.handleShareFile}
        >
          Share (coming soon)
        </div>
        <div className="contextMenu--option"
             onClick={this.handleTransferFiles}
        >
          Transfer
        </div>
        <DownloadLink file={this.props.focusedFiles[0]}
                      disabled={true}
        >
          Download
        </DownloadLink>
        <div className="contextMenu--option"
             onClick={this.handleMoveFile}
        >
          Move
        </div>
        <div className="contextMenu--option"
             onClick={this.handleCopyFiles}
        >
          Copy
        </div>
        <div className="contextMenu--option"
             onClick={this.handleDeleteFiles}
        >
          Delete
        </div>
      </React.Fragment>
  );

  render() {
    const { visible } = this.state;

    return (
        <div>
          <EventListener
              target="window"
              onScroll={this._handleScroll}
              onClick={this._handleClick}
              onContextMenu={this._handleContextMenu}
          >
            {(visible || null) && (
                <div ref={ref => {this.root = ref}}
                     className="contextMenu"
                >
                  {this.props.focusedFilePaths.length === 1 ? this.singleFileContextMenu() : this.multipleFileContextMenu()}
                </div>
            )}
          </EventListener>
        </div>
    );
  };
}

const mapStateToProps = (store, ownProps) => {
  return {
    fileViewFormat: store.visualOptions.fileViewFormat,
    focusedFilePaths: store.focusedFiles.list,
    focusedFiles: store.focusedFiles.list.map(f => store.filesFlat[f])
  };
};

export default connect(mapStateToProps)(ContextMenu);