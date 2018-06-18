import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
//import refresh from 'react-icons/io/'


export default class BrowserRefresh extends Component {

	static propTypes = {
		updateUIWithNewFiles: PropTypes.func.isRequired
	};

	render(){
		return (
			<div style={{marginTop:'10px', marginBottom:'12px'}} className="refresh">
    			<button id="RefreshButton" 
    					type="button"
    					onClick={this.props.updateUIWithNewFiles}
    					style={{paddingLeft:'15px'}}>
    						<ion-icon name="refresh"></ion-icon>
    			</button>

    			<label  style={{fontWeight:400, 
    							margin:0, 
    							paddingLeft:'10px'}} 
    					htmlFor="DotfilesCheckbox">Refresh</label>
			</div>
		)
	}
}