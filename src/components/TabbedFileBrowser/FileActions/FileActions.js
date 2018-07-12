import { addModal } from "../../../actions/modals";
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import { connect } from 'react-redux';
import {deleteFile} from "../../../actions/files";
import { DeleteFileModal } from '../../Modal/DeleteFileModal';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import PropTypes from 'prop-types';
import React from "react";
import './fileActionMenu.css';


class FileActions extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    fileName: PropTypes.string.isRequired,
    filePath: PropTypes.string.isRequired,
  };

  static noOpAndStopClickPropagation(e) {
    e.stopPropagation();
  }

  stopClickPropagation = (action) => (e) => {
      e.stopPropagation();
      action();
  };

  render() {
    const actions = [
      ['Share', () => {console.log('share')}],
      ['Download', () => {console.log('download')}],
      ['Rename', () => {console.log('rename')}],
      ['Move', () => {console.log('move')}],
      ['Copy', () => {console.log('copy')}],
      ['Delete', () => {
        this.props.dispatch(addModal({
          fileName: this.props.fileName,
          action: deleteFile(this.props.filePath)
        }));
      }]
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


export default connect()(FileActions);