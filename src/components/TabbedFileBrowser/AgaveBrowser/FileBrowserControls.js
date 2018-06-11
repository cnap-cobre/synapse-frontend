import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
import DotfilesCheckbox from './DotfilesCheckBox.js'
import BrowserRefresh from './BrowserRefresh.js'


export default class FileBrowserControls extends Component {

	static propTypes = {
		toggleDotfiles: PropTypes.func.isRequired
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
	        	<DotfilesCheckbox toggleDotfiles={this.props.toggleDotfiles}
	        					  showDotfiles={this.props.showDotfiles} />

	        	{/*<BrowserRefresh />*/}

	        </div>
		)
	}
}

