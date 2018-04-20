import React from 'react';

class TreeNode extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true,
            children: []
        };

        this.handleDoubleClick = this.handleDoubleClick.bind(this);
    }

    componentDidMount() {
        if (this.props.autoOpen)
            this.handleDoubleClick();
    }

    handleDoubleClick(event) {
        if (event)
            event.preventDefault();

        if (this.props.type !== 'dir')
            return;

        this.setState(prevState => ({
            collapsed: !prevState.collapsed,
        }));

        if (this.state.children.length === 0) {
//            this.props.loadCallback(this.props.path)
//                .then(children => this.setState({ children: children }));
            this.setState({ children: [{ type: 'dir', name: 'test', path: 'test' }] });
        }
    }

    render() {
        let iconClass = 'tree-view-node',
            labelClass = 'tree-view-node-label';
        if (this.props.type === 'dir') {
            if (this.state.collapsed)
                iconClass += ' tree-view-folder-closed';
            else
                iconClass += ' tree-view-folder-open';
        }
        if (this.props.path === this.props.activePath)
            labelClass += ' tree-view-node-selected';

        return (
            <ul className={iconClass}>
                <span className={labelClass} onClick={(e) => this.props.clickCallback(e, this)} onDoubleClick={this.handleDoubleClick}>{this.props.name}</span>
                <li className="tree-view-node">
                    {this.state.children.map((node, index) =>
                        <TreeNode
                            key={node.path}
                            name={node.name}
                            type={node.type}
                            path={node.path}
                            data={node}
                            loadCallback={this.props.loadCallback}
                            clickCallback={this.props.clickCallback}
                            activePath={this.props.activePath}
                        />
                    )}
                </li>
            </ul>
        );
    }
}

export default TreeNode;
