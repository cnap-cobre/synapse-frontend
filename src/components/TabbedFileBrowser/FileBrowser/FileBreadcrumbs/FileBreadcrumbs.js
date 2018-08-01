import Breadcrumb from "react-bootstrap/lib/Breadcrumb";
import { Link } from "redux-json-router";
import path from 'path';
import PropTypes from 'prop-types';
import React from "react";
import './breadcrumbs.css';


export default class FileBreadcrumbs extends React.Component {
  static propTypes = {
    systemName: PropTypes.string.isRequired,
    prefix: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    crumbComponent: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
    ]).isRequired,
  };

  getPath() {
    return this.props.pathname.slice(
        this.props.prefix.length
    ).split('/').slice(1).slice(0, -1);
  }

  render(){
    console.log(this.props);

    const breadcrumbs = [
        this.props.systemName,
        ...this.getPath()
    ].map((val, index, array) => {
      const invIndex = array.length - index - 1;
      const to = path.normalize(
          this.props.pathname + "../".repeat(invIndex)
      );

      if (invIndex) {
        return <li key={invIndex}>
          {(() => {
            if (typeof(this.props.crumbComponent) === 'function'){
              return (<this.props.crumbComponent to={to}>{val}</this.props.crumbComponent>);
            } else {
              return React.cloneElement(this.props.crumbComponent, {to, children: val});
            }
          })()}
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