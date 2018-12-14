// @flow

import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import { fileIconResolver } from '../../util/FileIconResolver';
import './fileGridIcon.scss';
import type { FileType } from '../../types/fileTypes';

type Props = {
  showDotfiles: boolean,
  error: boolean,
  loading: boolean,
  list: Array<FileType>,
  focusedFilePaths: Array<string>,
  handleDoubleClick(file: FileType): void,
  handleSingleClick(
      file: FileType,
      list: Array<FileType>,
      e: SyntheticMouseEvent<HTMLElement>
  ): void,
  handleContextMenu(file: FileType): void,
}

export default class FileBrowserGrid extends React.Component<Props> {
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
      <div
        key={item.name}
        onDoubleClick={() => handleDoubleClick(item)}
        onClick={e => handleSingleClick(item, array, e)}
        onContextMenu={() => handleContextMenu(item)}
        className={`fileGridIconBlock rightClickableFile ${this.getSelectedClass(item)}`}
        file={{
          ...item,
          dirPath: `${item.fullPath.split('/').slice(0, -1).join('/')}/`,
        }}
      >
        <div className="innerWrapper">
          <div className="fileGridIcon">
            {fileIconResolver(item)}
              &nbsp;&nbsp;
          </div>
          <div className="fileName">
            {item.name}
          </div>
        </div>
      </div>
    );
  }

  render() {
    const {
      list, showDotfiles, error, loading,
    } = this.props;
    const folders = list.filter(
      item => ((showDotfiles || !item.name.match(/^\./i)) && item.type === 'dir'),
    );

    const files = list.filter(
      item => ((showDotfiles || !item.name.match(/^\./i)) && item.type === 'file'),
    );

    const allComponents = [
      ...folders,
      ...files,
    ].map(this.fileToComponent);

    return (

      <Grid fluid>
        <Row style={{ display: error || loading ? 'none' : 'block' }}>

          {folders.length ? (
            <Col xs={12}>
              <h6>Folders</h6>
              <hr />
            </Col>
          ) : (null)}

          <Col xs={12} className="fileGridFlexContainer">
            {allComponents.filter(c => c.props.file.type === 'dir')}
            {Array.from(Array(9).keys()).map(i => (<div className="fileGridPlaceholder" key={i} />))}
          </Col>

          {files.length ? (
            <Col xs={12} style={{ marginTop: '1.5em' }}>
              <h6>Files</h6>
              <hr />
            </Col>
          ) : (null)}

          <Col xs={12} className="fileGridFlexContainer">
            {allComponents.filter(c => c.props.file.type === 'file')}
            {Array.from(Array(9).keys()).map(i => (<div className="fileGridPlaceholder" key={i} />))}
          </Col>

        </Row>
      </Grid>
    );
  }
}
