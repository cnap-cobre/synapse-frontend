import React, { Component } from "react";
import path from 'path';

import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class FileBreadcrumbs extends Component {
  getPath() {
    return this.props.history.location.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
  }

  render(){
    const breadcrumbs = [
        this.props.systemDisplayName,
        ...this.getPath()
    ].map((val, index, array) => {
      const invIndex = array.length - index - 1;
      const to = path.normalize(
          this.props.history.location.pathname + "../".repeat(invIndex)
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
        <Breadcrumb>
          {breadcrumbs}
        </Breadcrumb>
    );
  }
}