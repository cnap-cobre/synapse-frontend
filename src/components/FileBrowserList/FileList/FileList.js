import PropTypes from 'prop-types';
import React from 'react';
import { format, formatDistance } from 'date-fns';
import { humanFileSize } from '../../../util/FileSize.js';
import { fileIconResolver } from '../../../util/FileIconResolver';
import './fileList.scss';

export default class FileList extends React.Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
    handleSingleClick: PropTypes.func.isRequired,
    handleContextMenu: PropTypes.func.isRequired,
    showDotfiles: PropTypes.bool,
  };

  static defaultProps = {
    ...React.Component.defaultProps,
    list: [],
  };

  getSelectedClass = file => (
    this.props.focusedFilePaths.filter(focused => (
      focused === `/${file.provider}/${file.system}${file.path}`
    )).length !== 0 ? 'focused' : ''
  );

  fileToComponent = (item, i, array) => (
    <tr
      className={`rightClickableFile ${this.getSelectedClass(item)}`}
      onDoubleClick={e => this.props.handleDoubleClick(item, e)}
      onClick={e => this.props.handleSingleClick(item, array, e)}
      onContextMenu={e => this.props.handleContextMenu(item, e)}
      key={item.name}
    >
      <td>
        {fileIconResolver(item)}
&nbsp;&nbsp;&nbsp;
        { item.name }
      </td>
      <td>{ humanFileSize(item.length) }</td>
      <td title={format(item.lastModified, 'MM/dd/yyyy HH:mm:ss - OOOO')}>{ formatDistance(item.lastModified, Date.now()) }</td>
    </tr>
  );

  render() {
    const folders = this.props.list.filter(
      (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === 'dir'),
    );

    const files = this.props.list.filter(
      (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === 'file'),
    );

    return (
      <tbody className="fileList">
        { [
          ...folders,
          ...files,
        ].map(this.fileToComponent) }
      </tbody>
    );
  }
}
