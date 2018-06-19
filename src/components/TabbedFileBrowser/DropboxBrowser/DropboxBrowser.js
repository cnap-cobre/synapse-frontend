import React, { Component } from "react";
import { withCookies, Cookies } from "react-cookie";
import FileBrowserPropTypes from '../../../proptypes/FileBrowserPropTypes.js';

import FileBrowser from "../FileBrowser/FileBrowser";
import DropboxService from '../../../services/Dropbox';


class DropboxBrowser extends Component {
  state = {
    list: [],
    loading: true,
    error: false,
    errorMessage: "",
    showDotfiles: false
  };

  static propTypes = FileBrowserPropTypes;

  FileActionsService = DropboxService(this.props.cookies.get('csrftoken'));

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

    const filePath = ['', ...this.getPath()].join('/');
    const url = '/dropbox/api/2/files/list_folder';
    console.log(filePath);
    let form = {
      'path': filePath
    };


    this.FileActionsService.list(
        filePath,
        this.abortController.signal
    )
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
            this.setState({error: true, loading: false, errorMessage: error.message});
          }
        });
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

  handleFileClick(item, e) {
    const history = this.props.history;
    if (item.format === 'folder' && item.name !== '.') {
      history.push('./' + item.name + '/');
    }
  }

  toggleDotfiles(e) {
    this.setState((state) => {
      return {showDotfiles: !state.showDotfiles}
    });
  }

  getPath() {
    return this.props.history.location.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
  }

  render() {
    return (
        <FileBrowser systemDisplayName={this.props.systemDisplayName}
                     prefix={this.props.prefix}
                     history={this.props.history}
                     list={this.state.list}
                     error={this.state.error}
                     errorMessage={this.state.errorMessage}
                     loading={this.state.loading}
                     showDotfiles={this.state.showDotfiles}
                     toggleDotfiles={this.toggleDotfiles.bind(this)}
                     handleFileClick={this.handleFileClick.bind(this)}
                     handleRefresh={this.FetchFiles.bind(this)}
                     fileActionsService={this.FileActionsService}
        />
    );
  }
}

export default withCookies(DropboxBrowser);