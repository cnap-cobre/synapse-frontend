import Col from 'react-bootstrap/lib/Col';
import {fileIconResolver} from "../../../../util/FileIconResolver";
import Grid from 'react-bootstrap/lib/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import {ContextMenuProvider} from 'react-contexify';
import './fileGridIcon.scss'

export default class FileBrowserGrid extends React.Component {
  static propTypes = {
    showDotfiles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleFileClick: PropTypes.func.isRequired,
  };

  fileToComponent = (item, i) => (
      <ContextMenuProvider
          id="fileActionsMenu"
          key={item.name}
          onDoubleClick={(e) => this.props.handleFileClick(item, e)}
          className="fileGridIconBlock"
          data={{
            file: item,
            dirPath: this.props.path,
            filePath: this.props.path + item.name,
            fileName: item.name
          }}
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

    return (

        <Grid fluid={true}>
          <Row style={{display: this.props.error || this.props.loading ? 'none' : 'block'}}>

            {folders.length ? (
                <Col xs={12}>
                  <h6>Folders</h6>
                  <hr />
                </Col>
            ) : (null)}

            <Col xs={12}>
              {folders.map(this.fileToComponent)}
            </Col>

            {files.length ? (
                <Col xs={12} style={{marginTop: '1.5em'}}>
                  <h6>Files</h6>
                  <hr />
                </Col>
            ) : (null)}

            <Col xs={12}>
              {files.map(this.fileToComponent)}
            </Col>

          </Row>
        </Grid>
    );
  }
}