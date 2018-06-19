import React, { Component } from "react";
import { humanFileSize } from "Utils/FileSize.js";
import { fetchErrorThrower, fetchToJson } from "Utils/FetchUtils";
import PropTypes from 'prop-types';
import { FaRefresh } from 'react-icons/lib/fa/';
import { Button } from 'react-bootstrap';


export default class BrowserRefresh extends Component {

	static propTypes = {
		handleRefresh: PropTypes.func.isRequired
	};

	render(){
		return (

    			<Button id="RefreshButton"
									bsSize="xsmall"
    					    onClick={this.props.handleRefresh}
									style={{
										height: "2.7em",
										marginLeft: "1.2em",
										marginTop: "0.5em"
									}}
					>
						<FaRefresh/>&nbsp;Refresh
    			</Button>

		)
	}
}