import React, {Component} from "react";
import FileActions from "Components/FileActions/FileActions";
import { humanFileSize } from "Utils/FileSize.js";
import { fileIconResolver } from "Utils/FileIconResolver";
import moment from 'moment';

import PropTypes from 'prop-types';

export default class FileList extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    onSelectFile: PropTypes.func
  };

  static defaultProps = {
    ...Component.defaultProps,
    list: [],
    onSelectFile: (item, e) => alert(item.name)
  };

  render() {
    const files = this.props.list.filter(
        (item, i) => (this.props.showDotfiles || !item.name.match(/^\./i))
    ).map((item, i) => (

          <tr onClick={(e) => this.props.onSelectFile(item, e)}
              key={ item.name }>
            <td>
              {fileIconResolver(item)}&nbsp;&nbsp;&nbsp;
              { item.name }
            </td>
            <td>{ humanFileSize(item.length) }</td>
            <td>{ moment(item.lastModified).format('l LT') }</td>
            <td>
              <FileActions file={item} id={i} />
            </td>
          </tr>

    ));

    return (
        <tbody>
        { files }
        </tbody>
    );
  }
}