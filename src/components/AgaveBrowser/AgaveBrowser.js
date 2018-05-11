import React from "react";
import { humanFileSize } from "Utils/FileSize.js";
import moment from 'moment';
import {PropagateLoader} from 'react-spinners';
import {Fade} from 'react-bootstrap';
import './AgaveBrowser.css';

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
    console.log('fetching...', url, this.state.path);
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
      console.log('pizza', result);
      this.setState({ list: result, loading: false });
    }).catch(( error ) => {
      setTimeout(()=> {
        this.setState({error: true, loading: false});
        console.log(error);
      }, 300);
    });
  }

  handleClick(item, e) {
    console.log(item.name);
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
    const list = [{ name: '..', length: 0, lastModified: '-'}].concat(this.state.list);
    console.log('cake', list);

    const files = list.map((item, i) => (
      <tr key={ item.name } onClick={(e) => this.handleClick(item, e)}>
        <td>{ item.name }</td>
        <td>{ humanFileSize(item.length) }</td>
        <td>{ moment(item.lastModified).format('l LT') }</td>
      </tr>
    ));

    return (
      <div className="card-content table-responsive table-full-width">
        <Fade in={!this.state.loading}>
          <table className="table table-hover" style={{display: this.state.error ? 'none' : 'table'}}>
            <thead>
            <tr><th>Name</th><th>Size</th><th>Last Modified</th></tr>
            </thead>
            <tbody>
            { files }
            </tbody>
          </table>
        </Fade>
        <div
            className="agave-browser"
            style={{display: this.state.loading ? 'block' : 'none'}}>
          <PropagateLoader
              color={'#512888'}
              loading={this.state.loading}
          />
        </div>
        <div
            className="alert alert-warning"
            style={{display: this.state.error ? 'block' : 'none'}}
        >
          <p><b>Service Unavailable - </b>The Agave API appears to be experienceing a service disruption.  Please try again later.</p>
          <p>Check <a href="http://status.agaveapi.co/">status.agaveapi.co</a> for the status of the Agave API services.</p>
          <pre><code>{this.state.errorMessage}</code></pre>
        </div>
      </div>
    );
  }
}

