import React, {Component} from "react";
import { humanFileSize } from "Utils/FileSize.js"
import moment from 'moment';

export default class FileList extends Component {
  render() {
    const list = [{ name: '..', length: 0, lastModified: '-'}].concat(this.props.list);

    const files = list.map((item, i) => (
        <tr key={ item.name } onClick={(e) => this.handleClick(item, e)}>
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