// @flow

import React from 'react';
import { format, formatDistance } from 'date-fns';
import { humanFileSize } from '../../../util/FileSize';
import { fileIconResolver } from '../../../util/FileIconResolver';
import './fileList.scss';
import type { FileType } from '../../../types/fileTypes';

type Props = {
  list: Array<FileType>,
  handleDoubleClick(file: FileType): void,
  handleSingleClick(
      file: FileType,
      list: Array<FileType>,
      e: SyntheticMouseEvent<HTMLElement>
  ): void,
  handleContextMenu(file: FileType): void,
  showDotfiles: boolean,
  focusedFilePaths: Array<string>,
}

export default class FileList extends React.Component<Props> {
  defaultProps = {
    list: [],
  };

  getSelectedClass = (file: FileType) => {
    const { focusedFilePaths } = this.props;
    return (
      focusedFilePaths.filter(focused => (
        focused === `/${file.provider}/${file.system}${file.path}`
      )).length !== 0 ? 'focused' : ''
    );
  }

  fileToComponent = (item: FileType, i: number, array: Array<FileType>) => {
    const { handleDoubleClick, handleSingleClick, handleContextMenu } = this.props;
    return (
      <tr
        className={`rightClickableFile ${this.getSelectedClass(item)}`}
        onDoubleClick={() => handleDoubleClick(item)}
        onClick={e => handleSingleClick(item, array, e)}
        onContextMenu={() => handleContextMenu(item)}
        key={item.name}
      >
        <td>
          <span style={{ position: 'relative', top: '3px' }}>
            {fileIconResolver(item)}
          </span>
            &nbsp;&nbsp;&nbsp;
          <span style={{ position: 'relative', top: '-4px' }}>{ item.name }</span>
        </td>
        <td>{ humanFileSize(item.length) }</td>
        <td
          title={item.lastModified ? format(item.lastModified, 'MM/dd/yyyy HH:mm:ss - OOOO') : null}
        >
          { item.lastModified ? formatDistance(item.lastModified, Date.now()) : null }
        </td>
      </tr>
    );
  }

  render() {
    const { list, showDotfiles } = this.props;
    const folders = list.filter(
      item => ((showDotfiles || !item.name.match(/^\./i)) && item.type === 'dir'),
    );

    const files = list.filter(
      item => ((showDotfiles || !item.name.match(/^\./i)) && item.type === 'file'),
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
