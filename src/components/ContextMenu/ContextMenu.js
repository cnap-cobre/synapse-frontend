import {connect} from 'react-redux';
import EventListener from 'react-event-listener';
import React from 'react';
import {copyFile, deleteFile, fetchFilesIfNeeded,
  invalidateFiles, moveFile, renameFile} from "../../actions/files";
import './ContextMenu.scss';
import {addModal} from "../../actions/modals";

const DownloadLink = (props) => {
  return (
      <a className="contextMenu--option"
         download
         href={props.file._links.self.href}
      >
        {props.children}
      </a>
  );
};

class ContextMenu extends React.Component {
  state = {
    visible: false,
  };

  _handleContextMenu = (event) => {
    event.preventDefault();
    console.log("context target", event.currentTarget);

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

  delayedRefresh = (path) => () => {
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      this.props.dispatch(invalidateFiles(path));
      this.props.dispatch(fetchFilesIfNeeded(path));
    }, 200);
  };

  handleSingleShareFile = (e) => {
    //e.stopPropagation();
    console.log('share');
  };

  handleRenameFile = (e) => {
    console.log("Option selected!");
    const file = this.props.focusedFiles[0];
    //e.stopPropagation();
    this.props.dispatch(addModal({
      modalType: 'renameFile',
      fileName: file.name,
      action: (newName) => {
        this.props.dispatch(
            renameFile(file, newName)
        ).then(this.delayedRefresh(file.fullPath.split('/').slice(0,-1).join('/') + '/'));
      }
    }));
  };

  handleMoveFile = (e) => {
    const file = this.props.focusedFiles[0];

    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Move ' + file.name,
      fileName: file.name,
      prompt: 'Select a new location for ' + file.name,
      submitText: 'Move',
      path: file.fullPath.split('/').slice(0,-1).join('/') + '/',
      systemName: file.system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...file.fullPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        this.props.dispatch(
            moveFile(file, newPath)
        )
            .then(this.delayedRefresh(file.dirPath))
            .then(this.delayedRefresh(newDirectoryPath))
      }
    }));
  };

  handleCopyFile = (e) => {
    const file = this.props.focusedFiles[0];

    this.props.dispatch(addModal({
      modalType: 'moveCopyFile',
      title: 'Copy ' + file.name,
      fileName: file.name,
      prompt: 'Select a location to copy ' + file.name,
      submitText: 'Copy',
      path: file.fullPath.split('/').slice(0,-1).join('/') + '/',
      systemName: file.system,
      action: (newPath) => {
        const newDirectoryPath = [
          ...file.fullPath.split('/').slice(0, 3),
          ...newPath.split('/').slice(1, -1),
          ''
        ].join('/');

        this.props.dispatch(
            copyFile(file, newPath)
        ).then(this.delayedRefresh(file.dirPath))
            .then(this.delayedRefresh(newDirectoryPath))
      }
    }));
  };

  handleDeleteFile = (e) => {
    const file = this.props.focusedFiles[0];

    this.props.dispatch(addModal({
      modalType: 'deleteFile',
      fileName: file.name,
      action: () => {
        this.props.dispatch(
            deleteFile(file)
        )
            .then(this.delayedRefresh(file.fullPath.split('/').slice(0,-1).join('/') + '/'));
      }
    }));
  };

  singleFileContextMenu = () => (
      <React.Fragment>
        <div className="contextMenu--option"
             onClick={this.handleSingleShareFile}
        >
          Share
        </div>
        <DownloadLink file={this.props.focusedFiles[0]}>
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
             onClick={this.handleCopyFile}
        >
          Copy
        </div>
        <div className="contextMenu--option"
             onClick={this.handleDeleteFile}
        >
          Delete
        </div>
      </React.Fragment>
  );

  multipleFileContextMenu = () => (
      <React.Fragment>
        <div className="contextMenu--option"
             onClick={this.handleShareFile}
        >
          Share
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