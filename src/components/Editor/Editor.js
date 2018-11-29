// @flow

import AceEditor from 'react-ace';
import React from 'react';
import 'brace/mode/python';
import 'brace/theme/monokai';

type Props = {
  fontSize: number,
  width: string,
  height: string,
  value: string,
}

const Editor = (props: Props) => {
  const {
    fontSize, width, height, value,
  } = props;
  return (
    <AceEditor
      mode="python"
      theme="monokai"
      name="code-editor"
      fontSize={fontSize}
      width={width}
      height={height}
      value={value}
      editorProps={{ $blockScrolling: true }}
    />
  );
};

export default Editor;
