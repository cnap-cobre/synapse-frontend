import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
import { FaRefresh } from 'react-icons/lib/fa/';


export default class BrowserRefresh extends Component {

	static propTypes = {
		handleRefresh: PropTypes.func.isRequired
	};

	render(){
		return (
			<div style={{marginTop:'10px', marginBottom:'12px'}} className="refresh">
    			<button id="RefreshButton" 
    					type="button"
    					onClick={this.props.handleRefresh}
    					style={{paddingLeft:'15px'}}>
    				<FaRefresh name="refresh" />
						Refresh
    			</button>
			</div>
		)
	}
}