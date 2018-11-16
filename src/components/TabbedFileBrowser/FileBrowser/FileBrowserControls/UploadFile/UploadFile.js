import {connect} from 'react-redux';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import {fileActions} from "../../../../../store/actions/Files";
import React from "react";

class UploadFile extends React.Component{
  static propTypes = {

  };

  handleClick = (e) => {
    e.preventDefault();

    this.fileInput.click();
  };

  handleFileSelection = (e) => {
    e.preventDefault();

    const files = this.fileInput.files;
    for(let i = 0; i < files.length; i++) {
      this.props.dispatch(fileActions.uploadFile(files[i], this.props.path));
    }
  };

  render = () => (
      <div>
        <div style={{
          overflow: 'hidden',
          position: 'relative'
        }}>
          <form ref={ref => {this.uploadForm = ref;}}
                style={{
            opacity: '1',
            position: 'absolute',
            right: '-50px'
          }}>
            <input type="file"
                   multiple={true}
                   ref={ref => {this.fileInput = ref;}}
                   onChange={this.handleFileSelection}
            />
          </form>
        </div>
        <button className="btn btn-xs btn-default"
                ref={ref => {this.fileUploadButton = ref;}}
                onClick={this.handleClick}
                style={{
                  height: "2.7em",
                  marginTop: "0.5em",
                  float: "right",
                  marginRight: "0.5em"
                }}
        >
          <FaArrowUp/>&nbsp;Upload
        </button>
      </div>
  );
}

export default connect()(UploadFile);