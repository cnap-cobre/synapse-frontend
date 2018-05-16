import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import PropTypes from 'prop-types';
import {history} from 'react-router-dom';

import FieldFieldHeader from "Components/FileFieldHeader/FileFieldHeader";
import FileList from "Components/FileList/FileList";
import ErrorMessage from "Components/ErrorMessage/ErrorMessage";
import Loader from "Components/Loader/Loader";
import FileBreadcrumbs from "Components/Breadcrumbs/Breadcrumbs";

export default class AgaveBrowser extends Component {
  state = {
    list: [],
    loading: true,
    error: false,
    errorMessage: ""
  };

  static propTypes = {
    prefix: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    systemDisplayName: PropTypes.string.isRequired,
    history: PropTypes.shape({
      length: PropTypes.number.isRequired,
      location: PropTypes.object.isRequired,
      action: PropTypes.string.isRequired,
    }).isRequired
  };

  componentDidMount() {
    /*
    * 1. Register a listener for browser location changes to update UI accordingly
    * 2. Setup AbortController so that we can send a signal to cancel pending but
    *    outdated requests.
    * 3. Fetch the files for the current path.
    * */

    const history = this.props.history;
    this.stopListeningToHistoryChange = history.listen((location, action) => {
      this.abortController.abort();
      this.abortController = new AbortController();
      this.FetchFiles();
    });

    this.abortController = new AbortController();
    this.FetchFiles();
  }

  componentWillUnmount() {
    this._unmounted = true;

    // History location listener
    this.stopListeningToHistoryChange();

    // Kill any existing fetch calls
    this.abortController.abort();
  }

  FetchFiles() {
    // Reinitialize state as loading without errors
    if (!this._unmounted) {
      this.setState({list: [], loading: true, error: false, errorMessage: ""});
    }

    const filePath = [this.props.system, ...this.getPath()].join('/');
    const url = '/agave/files/v2/listings/system/' + filePath;

    fetch(url, {
      credentials: "same-origin",
      signal: this.abortController.signal
    })
        .then((res) => {
          // Throw a proper error for a 500, etc. response code
          if(!res.ok) throw Error(res.statusText);
          return res;
        })
        .then((res) => {
          // Convert to JSON
          return res.json();
        })
        .then(({ result }) => {
          // Update UI with result file list
          this.setState({
            list: result.filter(e => e.name !== '.'),
            loading: false,
            error: false
          });
        })
        .catch(( error ) => {
          // Handle errors
          if (error.name === "AbortError") {
            // no-op
          } else if (!this._unmounted) {
            this.setState({error: true, loading: false, errorMessage: error});
          }
        });
  }

  handleClick(item, e) {
    const history = this.props.history;
    if (item.format === 'folder' && item.name !== '.') {
      history.push('./' + item.name + '/');
    }
  }

  getPath() {
    return this.props.history.location.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
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

