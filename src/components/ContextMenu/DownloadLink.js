// @flow
import * as React from 'react';
import type { FileType } from '../../types/fileTypes';

type Props = {
  disabled: boolean,
  file: FileType,
  children: React.Node
}

const DownloadLink = (props: Props) => {
  const { disabled, file, children } = props;
  return (
      <>
        { /* eslint-disable-next-line jsx-a11y/anchor-is-valid */ }
        <a
          className={`contextMenu--option ${disabled ? 'contextMenu--option__disabled' : ''}`}
          download
          href={disabled ? '' : file._links.self.href}
        >
          {children}
          {disabled && <span>&nbsp; (not yet supported)</span>}
        </a>
      </>
  );
};

export default DownloadLink;
