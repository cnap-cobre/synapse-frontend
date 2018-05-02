import React from "react";

export default class AgaveBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { list: [], path: [] }
  }

  componentDidMount() {
    this.AgaveBrowser();
  }

  AgaveBrowser() {
    const url = '/agave/files/v2/listings/' + this.state.path.join('/');
    console.log('fetching...', url, this.state.path);
    fetch(url, {
      credentials: "same-origin"
    }).then((response) => {
      return response.json();
    }).then(({ result }) => {
      console.log('pizza', result);
      this.setState({ list: result });
    });
  }

  handleClick(name, e) {
    console.log(name);
    if (name == '..'){
      this.setState({ 'path': this.state.path.slice(0, this.state.path.length - 1) });
    } else{
      this.setState({ 'path': this.state.path.concat([name])});
    }

    this.AgaveBrowser();
  }

  render() {
    const list = ['..'].concat(this.state.list);
    const files = list.map((item, i) => (
      <div>
        <a onClick={(e) => this.handleClick(item.name, e)}>{ item.name }</a>
      </div>
    ));

    return (
      <div className="container">
       <div className="list">{ files }</div>
      </div>
    );
  }
}

