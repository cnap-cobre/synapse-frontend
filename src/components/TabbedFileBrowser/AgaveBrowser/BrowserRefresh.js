import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';

export default class BrowserRefresh extends Component {

	static propTypes = {
		
	};

	render(){
		return (
			<div className="checkbox">
    			<input id="DotfilesCheckbox" type="checkbox" onChange={(event) => {
    				
    			}}/>

    			<label htmlFor="DotfilesCheckbox">Show Dotfiles</label>
			</div>
		)
	}
}