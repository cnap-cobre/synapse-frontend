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





  render() {


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