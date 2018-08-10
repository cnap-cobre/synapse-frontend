import {addModal} from "../../../actions/modals";
import {connect} from 'react-redux';
import React from 'react';
import {ContextMenu, Item, Separator, Submenu } from 'react-contexify';
import {copyFile, deleteFile, downloadFile, fetchFilesIfNeeded,
  invalidateFiles, moveFile, renameFile} from "../../../actions/files";
import 'react-contexify/dist/ReactContexify.min.css';

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

  actions = [
    ['Share', () => {console.log('share')}],
    ['Download', (refProps) => {
      this.props.dispatch(downloadFile(refProps.file))
    }],
    ['Rename', (refProps) => {
      this.props.dispatch(addModal({
        modalType: 'renameFile',
        fileName: refProps.fileName,
        action: (newName) => {
          this.props.dispatch(
              renameFile(refProps.file, newName)
          ).then(this.delayedRefresh(refProps.dirPath));
        }
      }));
    }],
    ['Move', (refProps) => {
      this.props.dispatch(addModal({
        modalType: 'moveCopyFile',
        title: 'Move ' + refProps.fileName,
        fileName: refProps.fileName,
        prompt: 'Select a new location for ' + refProps.fileName,
        submitText: 'Move',
        path: refProps.dirPath,
        systemName: refProps.file.system,
        action: (newPath) => {
          this.props.dispatch(
              moveFile(refProps.file, newPath)
          ).then(this.delayedRefresh(refProps.dirPath));
        }
      }));
    }],
    ['Copy', (refProps) => {
      this.props.dispatch(addModal({
        modalType: 'moveCopyFile',
        title: 'Copy ' + refProps.fileName,
        fileName: refProps.fileName,
        prompt: 'Select a location to copy ' + refProps.fileName,
        submitText: 'Copy',
        path: refProps.dirPath,
        systemName: refProps.file.system,
        action: (newPath) => {
          this.props.dispatch(
              copyFile(refProps.file, newPath)
          ).then(this.delayedRefresh(refProps.dirPath))
        }
      }));
    }],
    ['Delete', (refProps) => {
      this.props.dispatch(addModal({
        modalType: 'deleteFile',
        fileName: refProps.fileName,
        action: () => {
          this.props.dispatch(
              deleteFile(refProps.file)
          ).then(this.delayedRefresh(refProps.dirPath));
        }
      }));
    }]
  ];

  render = () => {
    const menuItems = this.actions.map((item, index) => {
      return (
          <Item
              onClick={this.stopClickPropagation(item[1])}
              key={index}>
            {item[0]}
          </Item>
      );
    });

    return (
        <ContextMenu id="fileActionsMenu" style={{zIndex: '101'}}>
          {menuItems}
        </ContextMenu>
    );
  };
}

export default connect()(FileActionsMenu);