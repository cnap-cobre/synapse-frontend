import React, {Component} from 'react';

import FieldFieldHeader from "./FileFieldHeader/FileFieldHeader";
import FileList from "./FileList/FileList";

export default class FileBrowserList extends Component {
  render(){
    return (
        <table className="table table-hover"
               style={{display: this.props.error || this.props.loading ? 'none' : 'table'}}>
          <FieldFieldHeader/>
          <FileList list={this.props.list}
                    showDotfiles={this.props.showDotfiles}
                    onSelectFile={this.props.handleClick}/>
        </table>
    );
  }
}