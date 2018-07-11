import { Breadcrumb } from "react-bootstrap";
import { Link } from "redux-json-router";
import path from 'path';
import PropTypes from 'prop-types';
import React from "react";
import './breadcrumbs.css';


export default class FileBreadcrumbs extends React.Component {
  static propTypes = {
    system: PropTypes.shape({
      id: PropTypes.string.isRequired,
      provider: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired,
    prefix: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
  };

  getPath() {
    return this.props.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
  }

  render(){
    console.log('-----');
    const breadcrumbs = [
        this.props.system.name,
        ...this.getPath()
    ].map((val, index, array) => {
      const invIndex = array.length - index - 1;
      console.log(val, index, array, invIndex);
      const to = path.normalize(
          this.props.pathname + "../".repeat(invIndex)
      );

      if (invIndex) {
        return <li key={invIndex}>
          <Link to={to}>{val}</Link>
        </li>
      } else {
        return (
            <Breadcrumb.Item active={true} key={invIndex}>
              {val}
            </Breadcrumb.Item>
        );
      }
    });

    return (
        <Breadcrumb style={this.props.style}>
          {breadcrumbs}
        </Breadcrumb>
    );
  }
}