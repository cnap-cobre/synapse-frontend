import Col from 'react-bootstrap/lib/Col';
import {ContextMenuProvider} from 'react-contexify';
import {fileIconResolver} from "../../../../util/FileIconResolver";
import Grid from 'react-bootstrap/lib/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import './fileGridIcon.scss'

export default class FileBrowserGrid extends React.Component {
  static propTypes = {
    showDotfiles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
    handleSingleClick: PropTypes.func.isRequired,
    handleContextMenu: PropTypes.func.isRequired,
  };

  getSelectedClass = (file) => (
      this.props.focusedFilePaths.filter((focused) => (
          focused === '/' + file.provider + '/' + file.system + file.path
      )).length !== 0 ? 'focused' : ''
  );

  fileToComponent = (item, i, array) => (
      <ContextMenuProvider
          id="fileActionsMenu"
          key={item.name}
          onDoubleClick={(e) => this.props.handleDoubleClick(item, e)}
          onClick={(e) => this.props.handleSingleClick(item, array, e)}
          className={"fileGridIconBlock " + this.getSelectedClass(item)}
          data={{
            file: item,
            dirPath: this.props.path,
            filePath: this.props.path + item.name,
            fileName: item.name
          }}
          onContextMenu={(e) => this.props.handleContextMenu(item, e)}
      >
        <div className="innerWrapper">
          <div className="fileGridIcon">
            {fileIconResolver(item)}&nbsp;&nbsp;
          </div>
          <div className="fileName">
            {item.name}
          </div>
        </div>
      </ContextMenuProvider>
  );

  render() {
    const folders = this.props.list.filter(
        (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "dir")
    );

    const files = this.props.list.filter(
        (item, i) => ((this.props.showDotfiles || !item.name.match(/^\./i)) && item.type === "file")
    );

    const allComponents = [
        ...folders,
        ...files
    ].map(this.fileToComponent);

    return (

        <Grid fluid={true}>
          <Row style={{display: this.props.error || this.props.loading ? 'none' : 'block'}}>

            {folders.length ? (
                <Col xs={12}>
                  <h6>Folders</h6>
                  <hr />
                </Col>
            ) : (null)}

            <Col xs={12} className="fileGridFlexContainer">
              {allComponents.filter(c => c.props.data.file.type === 'dir')}
              {Array.from(Array(9).keys()).map((i) => (<div className="fileGridPlaceholder" key={i} />))}
            </Col>

            {files.length ? (
                <Col xs={12} style={{marginTop: '1.5em'}}>
                  <h6>Files</h6>
                  <hr />
                </Col>
            ) : (null)}

            <Col xs={12} className="fileGridFlexContainer">
              {allComponents.filter(c => c.props.data.file.type === 'file')}
              {Array.from(Array(9).keys()).map((i) => (<div className="fileGridPlaceholder" key={i} />))}
            </Col>

          </Row>
        </Grid>
    );
  }
}