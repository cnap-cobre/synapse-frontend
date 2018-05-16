import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';

import FieldFieldHeader from "Components/FileFieldHeader/FileFieldHeader";
import FileList from "Components/FileList/FileList";
import ErrorMessage from "Components/ErrorMessage/ErrorMessage";
import Loader from "Components/Loader/Loader";
import FileBreadcrumbs from "Components/FileBreadcrumbs/FileBreadcrumbs";

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
        // Throw a proper error if we get a 500, etc. response code
        .then(fetchErrorThrower)

        // Convert to JSON
        .then(fetchToJson)

        // Update UI with result file list
        .then(this.updateUIWithNewFiles.bind(this))

        .catch(( error ) => {
          if (error.name === "AbortError") {
            // We have aborted this request because it's no longer necessary
            // i.e. The user has navigated to a different directory or away
            // from this file browser alltogether.  Nothing to do here.
          } else if (!this._unmounted) {
            // Update UI with any other error message if the component is
            // still mounted.
            this.setState({error: true, loading: false, errorMessage: error});
          }
        })
    ;
  }

  updateUIWithNewFiles({ result }) {
    const list = result;
    if (!this._unmounted) {
      this.setState({
        list: list.filter(e => e.name !== '.'),
        loading: false,
        error: false
      });
    }
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