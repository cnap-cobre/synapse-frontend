import React, { Component } from "react";
import {connect} from 'react-redux';
import path from 'path';

import { Breadcrumb } from "react-bootstrap";
import { Link } from "redux-json-router";

import PropTypes from 'prop-types';

import './breadcrumbs.css';

class FileBreadcrumbs extends Component {
  static propTypes = {
    systemDisplayName: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
  };

  getPath() {
    return this.props.pathname.slice(
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


const mapStateToProps = ({ router }) => ({
  pathname: router.pathname
});

export default connect(mapStateToProps)(FileBreadcrumbs);