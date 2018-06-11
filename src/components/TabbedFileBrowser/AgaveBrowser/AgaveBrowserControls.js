import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
import DotFilesCheckbox from './DotFilesCheckBox.js'


export default class AgaveBrowserControls extends Component {

	static propTypes = {
		//showDotfiles: PropTypes.bool.isRequired
	};

	passDotFiles() {
		this.props.toggleDotFiles()
	};

	render(){
	return (
		<div className="browserControls" style={{
          padding: "1px 15px",
          backgroundColor: "#e4e4e4",
          borderRadius: "4px",
          textAlign: "left",
          marginBottom: "20px"
        }}>
        	<DotFilesCheckbox toggleDotFiles={this.passDotFiles} />
        </div>
	)
	}
}

