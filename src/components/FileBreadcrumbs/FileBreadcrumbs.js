// @flow

import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';
import path from 'path';
import * as React from 'react';
import './breadcrumbs.css';

type Props = {
  systemName: string,
  prefix: string,
  pathname: string,
  crumbComponent: React.Node,
  style?: any,
}

export default class FileBreadcrumbs extends React.Component<Props> {
  static defaultProps = { style: {} };

  getPath() {
    const { pathname, prefix } = this.props;
    return pathname.slice(
      prefix.length,
    ).split('/').slice(1).slice(0, -1);
  }

  render() {
    const {
      systemName, pathname, crumbComponent, style,
    } = this.props;
    const CrumbComponent = crumbComponent;

    const breadcrumbs = [
      systemName,
      ...this.getPath(),
    ].map((val, index, array) => {
      const invIndex = array.length - index - 1;
      const to = path.normalize(
        pathname + '../'.repeat(invIndex),
      );

      if (invIndex) {
        return (
          <li key={invIndex}>
            {(() => {
              if (typeof (crumbComponent) === 'function') {
                return (<CrumbComponent to={to}>{val}</CrumbComponent>);
              }
              return React.cloneElement(crumbComponent, { to, children: val });
            })()}
          </li>
        );
      }
      return (
        <Breadcrumb.Item active key={invIndex}>
          {val}
        </Breadcrumb.Item>
      );
    });

    return (
      <Breadcrumb style={style}>
        {breadcrumbs}
      </Breadcrumb>
    );
  }
}
