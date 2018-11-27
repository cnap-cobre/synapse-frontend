// @flow
import * as React from 'react'
import type {FileType} from "../../types/fileTypes";

type Props = {
  disabled: boolean,
  file: FileType,
  children: React.Node
}

const DownloadLink = (props: Props) => {
  return (
      <a className={"contextMenu--option " + (props.disabled ? "contextMenu--option__disabled": "")}
         download
         href={props.disabled ? "" : props.file._links.self.href}
      >
        {props.children}
        {props.disabled && <span>&nbsp; (not yet supported)</span>}
      </a>
  );
};

export default DownloadLink