import React from 'react';
import './TreeView.css';
import TreeNode from './TreeNode.js';

class TreeView extends React.Component {
    constructor() {
        super();
        this.state = { activePath: '' };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event, node) {
        if (!event) return;
        event.preventDefault();

        this.setState({ activePath: node.props.path });

        if (this.props.selectCallback)
            this.props.selectCallback(node.props.data);
    }

    render() {
        return (
            <div className="TreeView">
                <TreeNode
                    name={this.props.path}
                    path={this.props.path}
                    type={"dir"}
                    loadCallback={this.props.loadCallback}
                    clickCallback={this.handleClick}
                    autoOpen={true}
                    activePath={this.state.activePath}
                />
            </div>
        );
    }
}


export default TreeView;
