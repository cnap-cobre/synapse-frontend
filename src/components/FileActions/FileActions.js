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
            <MenuItem
                eventKey="1"
                onClick={this.stopClickPropagation}>
              Share
            </MenuItem>
            <MenuItem
                eventKey="2"
                onClick={this.stopClickPropagation}>
              Download
            </MenuItem>
            <MenuItem
                eventKey="3"
                onClick={this.stopClickPropagation}>
              Rename
            </MenuItem>
            <MenuItem
                eventKey="4"
                onClick={this.stopClickPropagation}>
              Move
            </MenuItem>
            <MenuItem
                eventKey="5"
                onClick={this.stopClickPropagation}>
              Copy
            </MenuItem>
            <MenuItem
                eventKey="6"
                onClick={this.stopClickPropagation}>
              Delete
            </MenuItem>
          </DropdownButton>
        </ButtonToolbar>
    );
  }
}