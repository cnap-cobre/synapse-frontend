import React, { Component } from 'react';
import './AgaveFileBrowser.css';
import TreeView from './TreeView.js';

class AgaveFileBrowser extends Component {
    constructor() {
        super();
        this.state = {
            selectedValue: ''
        };
    }

    loadContents(path) {
        let url = this.props.baseUrl + path;

        return fetch(url, { method: "GET", headers: { Authorization: "Bearer " + this.props.token } })
            .then(function(response) {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(function(data) {
                if (data.status === "success")
                    return data.result.filter((n) => (n.name !== ".")); // remove "." path
            });
    }

    selectCallback(node) {
        if (node) {
            this.setState({ selectedValue: node.path });
        }
    }

    render() {
        return (
            <div className="AgaveFileBrowser">
                <div>
                    <button id="select">Select</button>
                    <input id="selected" size="60" value={this.state.selectedValue}/>
                </div>
                <TreeView className="TreeView"
                    path={this.props.username}
                    loadCallback={this.loadContents.bind(this)}
                    selectCallback={this.selectCallback.bind(this)}
                />
            </div>
        );
    }
}
window.aga = AgaveFileBrowser;
export default AgaveFileBrowser;
