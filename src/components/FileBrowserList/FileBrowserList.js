// @flow

import React from 'react';
import FieldFieldHeader from './FileFieldHeader/FileFieldHeader';
import FileList from './FileList/FileList';
import type { FileType } from '../../types/fileTypes';

type Props = {
  showDotfiles: boolean,
  error: boolean,
  loading: boolean,
  list: Array<FileType>,
  path: string,
  handleDoubleClick(file: FileType): void,
  handleSingleClick(
      file: FileType,
      list: Array<FileType>,
      e: SyntheticMouseEvent<HTMLElement>
  ): void,
  handleContextMenu(file: FileType): void,
  focusedFilePaths: Array<string>,
}

const FileBrowserList = (props: Props) => {
  const {
    error, loading, list, path, showDotfiles, handleContextMenu,
    handleDoubleClick, handleSingleClick, focusedFilePaths,
  } = props;
  return (
    <table
      className="table table-hover"
      style={{ display: error || loading ? 'none' : 'table' }}
    >
      <FieldFieldHeader />
      <FileList
        list={list}
        path={path}
        showDotfiles={showDotfiles}
        handleContextMenu={handleContextMenu}
        handleDoubleClick={handleDoubleClick}
        handleSingleClick={handleSingleClick}
        focusedFilePaths={focusedFilePaths}
      />
    </table>
  );
};

export default FileBrowserList;
