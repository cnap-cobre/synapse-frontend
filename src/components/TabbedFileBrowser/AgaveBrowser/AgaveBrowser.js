import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';


import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../../Loader/Loader";
import FileBreadcrumbs from "../FileBreadcrumbs/FileBreadcrumbs";
import FileBrowserList from "../FileBrowserList/FileBrowserList";

export default class AgaveBrowser extends Component {
  state = {
    list: [],
    loading: true,
    error: false,
    errorMessage: "",
    showDotfiles: false
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
      if (history.location.pathname.indexOf(this.props.system) !== -1){
        this.FetchFiles();
      }
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
    const url = '/agave/files/v2/listings/system/' + filePath + '?limit=1000';

    fetch(url, {
      credentials: "same-origin",
      signal: this.abortController.signal
    })
        // Throw a proper error if we get a 500, etc. response code
        .then(fetchErrorThrower)

        // Convert to JSON
        .then(fetchToJson)

        // extract result list
        .then((response) => response.result)

        // Update UI with result file list
        .then(this.updateUIWithNewFiles.bind(this))

        // Clarify possible directory symlinks
        .then(this.ClarifyPossibleDirectorySymlinks.bind(this))

        // Update UI with new, corrected result list
        .then((list) => {console.log('Corrected List', list); return list;})
        .then(this.updateUIWithCorrectedFiles.bind(this))

        .catch(( error ) => {
          if (error.name === "AbortError") {
            // We have aborted this request because it's no longer necessary
            // i.e. The user has navigated to a different directory or away
            // from this file browser alltogether.  Nothing to do here.
          } else if (!this._unmounted) {
            // Update UI with any other error message if the component is
            // still mounted.
            this.setState({error: true, loading: false, errorMessage: error.message});
          }
        })
    ;
  }

  ClarifyPossibleDirectorySymlinks(list){
    const filePath = [this.props.system, ...this.getPath()].join('/');
    const url = '/agave/files/v2/listings/system/' + filePath;

    return Promise.all(
        list.map((file) => {
          if (file.type === 'file' &&
              file.length < 1024 &&
              'ALLEXECUTE'.indexOf(file.permissions) !== -1) {
            return fetch(url + '/' + file.name, {
              credentials: "same-origin",
              signal: this.abortController.signal
            }).then(fetchErrorThrower)
                .then(fetchToJson)
                .then((response) => response.result)
                .then((result) => {
                  if(result.length !== 1 || result[0].name !== file.name) {
                    const updated = file;
                    updated.type = 'dir';
                    updated.format = 'folder';
                    updated.mimeType = 'text/directory';
                    console.log('Corrected!', updated);
                    return updated;
                  } else {
                    return file;
                  }
                }).catch(() => {
                  // on error, just return the original file
                  return file;
                })
          } else {
            return file;
          }
        }
    ));
  }

  updateUIWithNewFiles( list ) {
    if (!this._unmounted) {
      this.setState({
        list: list.filter(e => e.name !== '.'),
        loading: false,
        error: false
      });
    }

    return list;
  }

  updateUIWithCorrectedFiles( list ) {
    if (!this._unmounted) {
      this.setState({
        list: list.filter(e => e.name !== '.')
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
                         style={{marginBottom: "0px"}}
        />
        <div className="browserControls" style={{
          padding: "1px 15px",
          backgroundColor: "#e4e4e4",
          borderRadius: "4px",
          textAlign: "left",
          marginBottom: "20px"
        }}>
          <div className="checkbox">
            <input id="dotFilesCheckbox" type="checkbox" onChange={(event) => {
              console.log(event);
              this.setState((state) => {
                return {showDotfiles: !state.showDotfiles}
              })
            }}/>
            <label htmlFor="dotFilesCheckbox">Show Dotfiles</label>
          </div>
        </div>


        <FileBrowserList list={this.state.list}
                         error={this.state.error}
                         loading={this.state.loading}
                         showDotfiles={this.state.showDotfiles}
                         handleClick={this.handleClick.bind(this)} />


        <Loader visible={this.state.loading}/>
        <ErrorMessage visible={this.state.error} message={this.state.errorMessage}/>
      </div>
    );
  }
}