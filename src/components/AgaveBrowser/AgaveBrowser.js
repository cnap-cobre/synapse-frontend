import React from "react";
import path from 'path';
import { humanFileSize } from "Utils/FileSize.js";

import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

import FieldFieldHeader from "Components/FileFieldHeader/FileFieldHeader";
import FileList from "Components/FileList/FileList";
import ErrorMessage from "Components/ErrorMessage/ErrorMessage";
import Loader from "Components/Loader/Loader";
import FileBreadcrumbs from "Components/Breadcrumbs/Breadcrumbs";

export default class AgaveBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      loading: true,
      error: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    const history = this.props.history;

    this.abortController = new AbortController();


    this.FetchFiles();
    this.stopListeningToHistoryChange = history.listen((location, action) => {
      this.abortController.abort();
      this.abortController = new AbortController();
      this.FetchFiles();
    });
  }

  componentWillUnmount() {
    this._unmounted = true;

    // Call to kill listener
    this.stopListeningToHistoryChange();

    // Kill any existing fetch calls
    this.abortController.abort();
  }

  getPath() {
    return this.props.history.location.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
  }

  FetchFiles() {
    // Reinitialize state as loading without errors
    if (!this._unmounted) {
      this.setState({list: [], loading: true, error: false, errorMessage: ""});
    }

    const filePath = this.getPath();

    const url = '/agave/files/v2/listings/' + filePath.join('/');

    fetch(url, {
      credentials: "same-origin",
      signal: this.abortController.signal
    }).then((res) => {
      this.request = null;
      return res;
    }).then((response) => {
      // Throw a proper error
      if(!response.ok) {
        if (this.isMounted()) {
          this.setState({errorMessage: response.statusText});
        }
        throw Error(response.statusText);
      }
      return response;
    }).then((response) => {
      return response.json();
    }).then(({ result }) => {
      this.setState({
        list: result.filter(e => e.name !== '.'),
        loading: false,
        error: false
      });
    }).catch(( error ) => {
      if (error.name === "AbortError") {
        // no-op
      } else if (!this._unmounted) {
        this.setState({error: true, loading: false});
      }
    });
  }

  handleClick(item, e) {
    const history = this.props.history;
    if (item.format === 'folder' && item.name !== '.') {
      history.push('./' + item.name + '/');
    }
  }

  render() {
    return (
      <div className="card-content table-responsive table-full-width">
        <FileBreadcrumbs systemDisplayName={this.props.systemDisplayName}
                         history={this.props.history}
                         prefix={this.props.prefix}
        />
        <table className="table table-hover"
               style={{display: this.state.error || this.state.loading ? 'none' : 'table'}}>
          <FieldFieldHeader/>
          <FileList list={this.state.list}
                    onSelectFile={this.handleClick.bind(this)}/>
        </table>
        <Loader visible={this.state.loading}/>
        <ErrorMessage visible={this.state.error} message={this.state.errorMessage}/>
      </div>
    );
  }
}

