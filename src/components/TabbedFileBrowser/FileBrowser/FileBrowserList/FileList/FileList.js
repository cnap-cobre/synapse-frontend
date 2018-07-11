import { fileIconResolver } from "../../../../../util/FileIconResolver";
import { humanFileSize } from "../../../../../util/FileSize.js";
import moment from 'moment';
import PropTypes from 'prop-types';
import React from "react";
import FileActions from "../../../FileActions/FileActions";


export default class FileList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    onSelectFile: PropTypes.func,
    showDotfiles: PropTypes.bool,
  };

  static defaultProps = {
    ...React.Component.defaultProps,
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
              <FileActions id={i}
                           fileName={item.name}
                           filePath={this.props.path + item.name}
              />
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