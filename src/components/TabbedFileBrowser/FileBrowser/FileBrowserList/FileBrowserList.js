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
    handleDoubleClick: PropTypes.func.isRequired,
    handleSingleClick: PropTypes.func.isRequired,
  };

  render(){
    return (
        <table className="table table-hover"
               style={{display: this.props.error || this.props.loading ? 'none' : 'table'}}>
          <FieldFieldHeader/>
          <FileList list={this.props.list}
                    path={this.props.path}
                    showDotfiles={this.props.showDotfiles}
                    handleDoubleClick={this.props.handleDoubleClick}
                    handleSingleClick={this.props.handleSingleClick}
          />
        </table>
    );
  }
}