import { ContextMenuProvider } from 'react-contexify';
import { fileIconResolver } from "../../../../../util/FileIconResolver";
import { humanFileSize } from "../../../../../util/FileSize.js";
import PropTypes from 'prop-types';
import React from "react";


export default class FileList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
    handleSingleClick: PropTypes.func.isRequired,
    showDotfiles: PropTypes.bool,
  };

  static defaultProps = {
    ...React.Component.defaultProps,
    list: [],
  };

  fileToComponent = (item, i) => (
      <ContextMenuProvider
          component="tr"
          id="fileActionsMenu"
          onDoubleClick={(e) => this.props.handleDoubleClick(item, e)}
          onClick={(e) => this.props.handleSingleClick(item, e)}
          key={ item.name }
          data={{
            file: item,
            dirPath: this.props.path,
            filePath: this.props.path + item.name,
            fileName: item.name
          }}
      >
        <td>
          {fileIconResolver(item)}&nbsp;&nbsp;&nbsp;
          { item.name }
        </td>
        <td>{ humanFileSize(item.length) }</td>
        <td>{ item.lastModified }</td>
      </ContextMenuProvider>
  );

  render() {
    const folders = this.props.list.filter(
        (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "dir")
    );

    const files = this.props.list.filter(
        (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "file")
    );

    return (
        <tbody>
          { folders.map(this.fileToComponent) }

          { files.map(this.fileToComponent) }
        </tbody>
    );
  }
}