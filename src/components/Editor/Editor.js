// @flow

import AceEditor from 'react-ace';
import PropTypes from 'prop-types';
import React from "react";
import 'brace/mode/python';
import 'brace/theme/monokai';

type Props = {
  fontSize: number,
  width: string,
  height: string,
  value: string,
}

export default class Editor extends React.Component<Props> {
  static propTypes = {
    fontSize: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
  };

  render() {
    return (
        <AceEditor
            mode="python"
            theme="monokai"
            name="code-editor"
            fontSize={this.props.fontSize}
            width={this.props.width}
            height={this.props.height}
            value={this.props.value}
            editorProps={{$blockScrolling: true}}
        />
    );
  }
}
