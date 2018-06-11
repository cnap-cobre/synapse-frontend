import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';



export default class DotFilesCheckBox extends Component {

	static propTypes = {
		//showDotfiles: PropTypes.bool.isRequired
		toggleDotFiles: PropTypes.func.isRequired
	};

	render(){
		return (
			<div className="checkbox">
    			<input id="DotFilesCheckbox" type="checkbox" onChange={(event) => {
    				this.toggleDotFiles
    			}}/>

    			<label htmlFor="DotFilesCheckbox">Show Dotfiles</label>
			</div>
		)
	}
}