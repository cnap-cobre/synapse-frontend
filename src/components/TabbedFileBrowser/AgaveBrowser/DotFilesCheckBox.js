import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';



export default class DotFilesCheckBox extends Component {

	static propTypes = {
		showDotfiles: PropTypes.bool.isRequired
	};

	render(){
		return (
			<div className="checkbox">
    			<input id="DotFilesCheckbox" type="checkbox" onChange={(event) => {
    			console.log(event);
    			this.setState((state) => {
    	    		return {showDotfiles: !showDotfiles}
    			})
    			}}/>
    			<label htmlFor="DotFilesCheckbox">Show Dotfiles</label>
			</div>
		)
	}
}