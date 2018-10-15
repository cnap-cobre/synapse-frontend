import { ContextMenuProvider } from 'react-contexify';
import { fileIconResolver } from "../../../../../util/FileIconResolver";
import { format, formatDistance } from 'date-fns';
import { humanFileSize } from "../../../../../util/FileSize.js";
import PropTypes from 'prop-types';
import React from "react";
import './fileList.scss';

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

  getSelectedClass = (file) => (
      this.props.focusedFilePaths.filter((focused) => (
          focused === '/' + file.provider + '/' + file.system + file.path
      )).length !== 0 ? 'focused' : ''
  );

  fileToComponent = (item, i, array) => (
      <ContextMenuProvider
          component="tr"
          className={this.getSelectedClass(item)}
          id="fileActionsMenu"
          onDoubleClick={(e) => this.props.handleDoubleClick(item, e)}
          onClick={(e) => this.props.handleSingleClick(item, array, e)}
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
        <td title={format(item.lastModified, 'MM/dd/yyyy HH:mm:ss - OOOO')}>{ formatDistance(item.lastModified, Date.now()) }</td>
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
        <tbody className="fileList">
          { [
              ...folders,
              ...files
          ].map(this.fileToComponent) }
        </tbody>
    );
  }
}