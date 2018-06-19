import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
import DotfilesCheckbox from './DotfilesCheckBox/DotfilesCheckBox.js'
import BrowserRefresh from './BrowserRefresh/BrowserRefresh.js'


export default class FileBrowserControls extends Component {

	static propTypes = {
		handleRefresh:PropTypes.func.isRequired,
		showDotfiles: PropTypes.bool.isRequired,
		toggleDotfiles: PropTypes.func.isRequired
	};

	render(){
		return (
			<div className="browserControls" style={{
	          padding: "1px 15px",
	          backgroundColor: "#e4e4e4",
	          borderRadius: "4px",
	          textAlign: "left",
	          marginBottom: "20px",
	          display: "flex",
	          flexDirection: "row"
	        }}>
	        	<DotfilesCheckbox toggleDotfiles={this.props.toggleDotfiles}
	        					  showDotfiles={this.props.showDotfiles} />

	        	<BrowserRefresh handleRefresh={this.props.handleRefresh} />

	        </div>
		)
	}
}

