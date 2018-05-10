import React from "react";
import { humanFileSize } from "Utils/FileSize.js";
import moment from 'moment';

export default class AgaveBrowser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      path: [],
      loading: true
    }
  }

  componentDidMount() {
    this.AgaveBrowser();
  }

  AgaveBrowser() {
    this.setState({ list: [], loading: true });
    const url = '/agave/files/v2/listings/' + this.state.path.join('/');
    console.log('fetching...', url, this.state.path);
    fetch(url, {
      credentials: "same-origin"
    }).then((response) => {
      return response.json();
    }).then(({ result }) => {
      console.log('pizza', result);
      this.setState({ list: result, loading: false });
    });
  }

  handleClick(item, e) {
    console.log(item.name);
    if (item.name == '..'){
      this.setState({
        'path': this.state.path.slice(0, this.state.path.length - 1)
      }, () => { this.AgaveBrowser(); });
    } else if (item.format == "folder"){
      this.setState({
        'path': this.state.path.concat([item.name])
      }, () => { this.AgaveBrowser(); });
    } else {
      alert("Would you like to download " + item.path + "?");
    }
  }

  render() {
    const list = [{ name: '..', length: 0, lastModified: '-'}].concat(this.state.list);
    console.log('cake', list);
    const files = list.map((item, i) => (
      <tr onClick={(e) => this.handleClick(item, e)}>
        <td>{ item.name }</td>
        <td>{ humanFileSize(item.length) }</td>
        <td>{ moment(item.lastModified).format('l LT') }</td>
      </tr>
    ));

    return (
      <div className="card-content table-responsive table-full-width">
        <table className="table table-hover">
          <thead>
          <tr><th>Name</th><th>Size</th><th>Last Modified</th></tr>
          </thead>
          <tbody>
          { files }
          </tbody>
        </table>
      </div>
    );
  }
}

