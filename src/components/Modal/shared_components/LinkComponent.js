// @flow
import * as React from 'react';

type LinkProps = {
  to?: string,
  children?: React.Node,
  onClick(string): typeof undefined,
}

const LinkComponent = (props: LinkProps) => {
  const { onClick, to, children } = props;
  return (
      <>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a onClick={() => {
          if (to !== undefined) {
            onClick(to);
          }
        }}
        >
          {children}
        </a>
        </>
  );
};

LinkComponent.defaultProps = {
  to: '',
  children: null,
};

export default LinkComponent;
