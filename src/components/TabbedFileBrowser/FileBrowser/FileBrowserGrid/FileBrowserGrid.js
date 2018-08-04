import PropTypes from 'prop-types';
import React from 'react';

export default class FileBrowserGrid extends React.Component {
  static propTypes = {
    showDotfiles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    handleFileClick: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div style={{display: this.props.error || this.props.loading ? 'none' : 'block'}}>
        {this.props.list.map((val, index) => (
            <div>Hello World</div>
        ))}
      </div>
    );
  }
}