import FieldFieldHeader from "./FileFieldHeader/FileFieldHeader";
import FileList from "./FileList/FileList";
import PropTypes from 'prop-types';
import React from 'react';


export default class FileBrowserList extends React.Component {
  static propTypes = {
    showDotfiles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleFileClick: PropTypes.func.isRequired,
  };

  render(){
    return (
        <table className="table table-hover"
               style={{display: this.props.error || this.props.loading ? 'none' : 'table'}}>
          <FieldFieldHeader/>
          <FileList list={this.props.list}
                    showDotfiles={this.props.showDotfiles}
                    onSelectFile={this.props.handleFileClick}
          />
        </table>
    );
  }
}