import FileActions from "../../../FileActions/FileActions";
import { fileIconResolver } from "../../../../../util/FileIconResolver";
import { humanFileSize } from "../../../../../util/FileSize.js";
import PropTypes from 'prop-types';
import React from "react";


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
    return (
        <tbody>
          { this.props.list.filter(
            (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "dir")
          ).map((item, i) => (

            <tr onDoubleClick={(e) => this.props.onSelectFile(item, e)}
                key={ item.name }>
              <td>
                {fileIconResolver(item)}&nbsp;&nbsp;&nbsp;
                { item.name }
              </td>
              <td>{ humanFileSize(item.length) }</td>
              <td>{ item.lastModified }</td>
              <td>
                <FileActions id={i}
                             dirPath={this.props.path}
                             filePath={this.props.path + item.name}
                             file={item}
                             fileName={item.name}
                />
              </td>
            </tr>

          )) }


          { this.props.list.filter(
              (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "file")
          ).map((item, i) => (

              <tr onDoubleClick={(e) => this.props.onSelectFile(item, e)}
                  key={ item.name }>
                <td>
                  {fileIconResolver(item)}&nbsp;&nbsp;&nbsp;
                  { item.name }
                </td>
                <td>{ humanFileSize(item.length) }</td>
                <td>{ item.lastModified }</td>
                <td>
                  <FileActions id={i}
                               dirPath={this.props.path}
                               filePath={this.props.path + item.name}
                               file={item}
                               fileName={item.name}
                  />
                </td>
              </tr>

          ))}
        </tbody>
    );
  }
}