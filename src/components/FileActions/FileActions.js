import React, {Component} from "react";
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

import PropTypes from 'prop-types';

import './fileActionMenu.css';

export default class FileActions extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired
  };

  static noOpAndStopClickPropagation(e) {
    e.stopPropagation();
  }

  stopClickPropagation(e) {
    e.stopPropagation();
    console.log('child click event');
    console.log(e);
    console.log(e.target);
    console.log(this);
  }

  render() {
    const actions = ['Share', 'Download', 'Rename', 'Move', 'Copy', 'Delete'];
    const menuItems = actions.map((item, index) => {
      return (
          <MenuItem
              eventKey={index}
              onClick={this.stopClickPropagation}>
            {item}
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