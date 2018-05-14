import React from "react";
import { humanFileSize } from "Utils/FileSize.js";

import FieldFieldHeader from "Components/FileFieldHeader/FileFieldHeader";
import FileList from "Components/FileList/FileList";
import ErrorMessage from "Components/ErrorMessage/ErrorMessage";
import Loader from "Components/Loader/Loader";

export default class AgaveBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      path: [],
      loading: true,
      error: false,
      errorMessage: ""
    }
  }

  componentDidMount() {
    this.AgaveBrowser();
  }

  AgaveBrowser() {
    setTimeout(()=>{
      this.setState({ list: [], loading: true });
    }, 300);
    const url = '/agave/files/v2/listings/' + this.state.path.join('/');
    fetch(url, {
      credentials: "same-origin"
    }).then((response) => {
      if(!response.ok) {
        throw Error(response.statusText);
        this.setState({ errorMessage: response.statusText });
      }
      return response;
    }).then((response) => {
      return response.json();
    }).then(({ result }) => {
      this.setState({ list: result, loading: false });
    }).catch(( error ) => {
      setTimeout(()=> {
        this.setState({error: true, loading: false});
        console.log(error);
      }, 300);
    });
  }

  handleClick(item, e) {
    if (item.name == '..'){
      this.setState({
        'path': this.state.path.slice(0, this.state.path.length - 1)
      }, () => { this.AgaveBrowser(); });
    } else if (item.name == '.') {
      // do nothing
    } else if (item.format == "folder"){
      this.setState({
        'path': this.state.path.concat([item.name])
      }, () => { this.AgaveBrowser(); });
    } else {
      alert("Would you like to download " + item.path + "?");
    }
  }

  render() {
    return (
      <div className="card-content table-responsive table-full-width">
        <table className="table table-hover" style={{display: this.state.error ? 'none' : 'table'}}>
          <FieldFieldHeader/>
          <FileList list={this.state.list}/>
        </table>
        <Loader visible={this.state.loading}/>
        <ErrorMessage visible={this.state.error} message={this.state.errorMessage}/>
      </div>
    );
  }
}

