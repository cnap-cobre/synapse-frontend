import React, {Component} from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

import PropTypes from 'prop-types';
import FileActionsServicePropTypes from '../../../proptypes/FileActionsServicePropTypes';
import FileItemPropTypes from '../../../proptypes/FileItemPropTypes';

import './fileActionMenu.css';

import { DeleteFileModal } from '../../Modal/DeleteFileModal';


export default class FileActions extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fileActionsService: FileActionsServicePropTypes,
    file: FileItemPropTypes
  };

  static noOpAndStopClickPropagation(e) {
    e.stopPropagation();
  }

  stopClickPropagation = (action) => (e) => {
      e.stopPropagation();
      action();
  };

  showDeleteModal = () => {
    console.log('correct component?', DeleteFileModal);
    this.props.modalContext.PushModalToDisplayContainer(
        <DeleteFileModal fileToBeDeleted={this.props.file}
                         deleteFile={this.props.fileActionsService.rm(this.props.file)} />
    );
  };

  render() {
    const actions = [
      ['Share', this.props.fileActionsService.share],
      ['Download', this.props.fileActionsService.wget(
          this.props.file
      )],
      ['Rename', this.props.fileActionsService.rename],
      ['Move', this.props.fileActionsService.mv],
      ['Copy', this.props.fileActionsService.cp],
      ['Delete', this.showDeleteModal]
      /*['Delete', this.props.fileActionsService.rm(
          this.props.file
      )]*/
    ];
    const menuItems = actions.map((item, index) => {
      return (
          <MenuItem
              eventKey={index}
              onClick={this.stopClickPropagation(item[1])}
              key={index}>
            {item[0]}
          </MenuItem>
      );
    });

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