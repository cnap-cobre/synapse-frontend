import { addModal } from "../../../actions/modals";
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { connect } from 'react-redux';
import { DeleteFileModal } from '../../Modal/DeleteFileModal';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import PropTypes from 'prop-types';
import React from "react";
import { ContextMenu, Item, Separator,
  Submenu, ContextMenuProvider } from 'react-contexify';
import {copyFile, deleteFile, downloadFile, fetchFilesIfNeeded,
  invalidateFiles, moveFile, renameFile} from "../../../actions/files";
import './fileActionMenu.css';
import 'react-contexify/dist/ReactContexify.min.css';


class FileActions extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    dirPath: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
    file: PropTypes.object.isRequired,
    fileName: PropTypes.string.isRequired,
  };

  static noOpAndStopClickPropagation(e) {
    e.stopPropagation();
  }

  stopClickPropagation = (action) => (e) => {
      e.stopPropagation();
      action();
  };

  delayedRefresh = () => {
    // We delay a bit here so that Dropbox has a chance to be consistent.
    // See "Brewers Cap Theorem" - Consistency, Availability, Partition tolerance
    setTimeout(() => {
      this.props.dispatch(invalidateFiles(this.props.dirPath));
      this.props.dispatch(fetchFilesIfNeeded(this.props.dirPath));
    }, 200);
  };

  actions = [
    ['Share', () => {console.log('share')}],
    ['Download', () => {
      this.props.dispatch(downloadFile(this.props.file))
    }],
    ['Rename', () => {
      this.props.dispatch(addModal({
        modalType: 'renameFile',
        fileName: this.props.fileName,
        action: (newName) => {
          this.props.dispatch(
              renameFile(this.props.file, newName)
          ).then(this.delayedRefresh);
        }
      }));
    }],
    ['Move', () => {
      this.props.dispatch(addModal({
        modalType: 'moveCopyFile',
        title: 'Move ' + this.props.fileName,
        fileName: this.props.fileName,
        prompt: 'Select a new location for ' + this.props.fileName,
        submitText: 'Move',
        path: this.props.dirPath,
        systemName: this.props.file.system,
        action: (newPath) => {
          this.props.dispatch(
              moveFile(this.props.file, newPath)
          ).then(this.delayedRefresh);
        }
      }));
    }],
    ['Copy', () => {
      this.props.dispatch(addModal({
        modalType: 'moveCopyFile',
        title: 'Copy ' + this.props.fileName,
        fileName: this.props.fileName,
        prompt: 'Select a location to copy ' + this.props.fileName,
        submitText: 'Copy',
        path: this.props.dirPath,
        systemName: this.props.file.system,
        action: (newPath) => {
          this.props.dispatch(
              copyFile(this.props.file, newPath)
          ).then(this.delayedRefresh)
        }
      }));
    }],
    ['Delete', () => {
      this.props.dispatch(addModal({
        modalType: 'deleteFile',
        fileName: this.props.fileName,
        action: () => {
          this.props.dispatch(
              deleteFile(this.props.file)
          ).then(this.delayedRefresh);
        }
      }));
    }]
  ];

  render() {
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
        <ContextMenu>
          {menuItems}
        </ContextMenu>
    );

    return (
        <ButtonToolbar onClick={FileActions.noOpAndStopClickPropagation}>
          <DropdownButton
            bsStyle="default"
            title={(<i className="ti-more"/>)}
            pullRight
            noCaret
            onClick={FileActions.noOpAndStopClickPropagation}
            id={"ddbtn" + this.props.id}
            className="fileActionBtn btn-simple"
          >
            {menuItems}
          </DropdownButton>
        </ButtonToolbar>
    );
  }
}


export default connect()(FileActions);