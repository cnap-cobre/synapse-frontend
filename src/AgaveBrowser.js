import React from "react";

export default class AgaveBrowser extends React.Component {
  constructor(props) {
    super(props);

    this.state = { list: [] }
  }

  componentDidMount() {
    this.AgaveBrowser();
  }

  AgaveBrowser() {
    fetch('/agave/files/v2/listings/', {
      credentials: "same-origin"
    }).then((response) => {
      return response.json();
    }).then(({ result }) => {
      console.log('pizza', result);
      this.setState({ list: result });
    });
  }

  render() {
    console.log('cake', this.state.list);
    const list = this.state.list.map((item, i) => (
      <div>
        <p>{ item.name }</p>
      </div>
    ));

    return (
      <div className="container">
       <div className="list">{ list }</div>
      </div>
    );
  }
}

