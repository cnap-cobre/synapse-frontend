import React, { Component } from "react";
import FileBrowserPropTypes from '../../../proptypes/FileBrowserPropTypes.js';
import AgaveService from '../../../services/Agave';

import FileBrowser from "../FileBrowser/FileBrowser";
import {withCookies, Cookies} from "react-cookie";


class AgaveBrowser extends Component {

  state = {
    list: [],
    loading: true,
    error: false,
    errorObject: {},
    showDotfiles: false
  };

  static propTypes = FileBrowserPropTypes;

  FileActionsService = AgaveService(
      this.props.cookies.get('csrftoken'),
      this.FetchFiles.bind(this)
  );

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
      console.log('history changed');
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
      this.setState({
        list: [],
        loading: true,
        error: false,
        errorObject: {}
      });
    }

    const filePath = [this.props.system, ...this.getPath()].join('/');

    this.FileActionsService.list(filePath, this.abortController.signal)

        // Update UI with result file list
        .then(this.updateUIWithNewFiles.bind(this))

        // Clarify possible directory symlinks
        .then(this.ClarifyPossibleDirectorySymlinks.bind(this))

        // Update UI with new, corrected result list
        //.then((list) => {console.log('Corrected List', list); return list;})
        .then(this.updateUIWithCorrectedFiles.bind(this))

        .catch(( error ) => {
          if (error.name === "AbortError") {
            // We have aborted this request because it's no longer necessary
            // i.e. The user has navigated to a different directory or away
            // from this file browser alltogether.  Nothing to do here.
          } else if (!this._unmounted) {
            // Update UI with any other error message if the component is
            // still mounted.
            this.setState({
              error: true,
              loading: false,
              errorObject: error
            });
          }
        })
    ;
  }

  ClarifyPossibleDirectorySymlinks(list){
    const filePath = [this.props.system, ...this.getPath()].join('/');


    return Promise.all(
        list.map((file) => {
          if (file.type === 'file' &&
              file.length < 1024 &&
              'ALLEXECUTE'.indexOf(file.permissions) !== -1)
          {
            return this.FileActionsService.list(filePath, this.abortController.signal)
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
                     errorObject={this.state.errorObject}
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


export default withCookies(AgaveBrowser);