import React, { Component } from "react";

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/python';
import 'brace/theme/monokai';

export default class Editor extends Component {
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
        />
    );
  }
}
