import React, {Component} from "react";
import { Link } from "react-router-dom";
import { humanFileSize } from "Utils/FileSize.js";
import moment from 'moment';

export default class FileList extends Component {
  static defaultProps = {
    ...Component.defaultProps,
    list: [],
    onSelectFile: (item, e) => alert(item.name)
  };

  render() {
    const files = this.props.list.map((item, i) => (

          <tr onClick={(e) => this.props.onSelectFile(item, e)}
              key={ item.name }>
            <td>{ item.name }</td>
            <td>{ humanFileSize(item.length) }</td>
            <td>{ moment(item.lastModified).format('l LT') }</td>
          </tr>

    ));

    return (
        <tbody>
        { files }
        </tbody>
    );
  }
}