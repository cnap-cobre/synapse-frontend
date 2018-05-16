import React, {Component} from "react";

export default class FieldFieldHeader extends Component {
  render() {
    return (
        <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Last Modified</th>
          <th><i className="ti-view-list-alt" /></th>
        </tr>
        </thead>
    );
  }
}