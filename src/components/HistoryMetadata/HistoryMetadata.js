import { connect } from 'react-redux';
import React from 'react';
import Loader from '../Loader/Loader';

class HistoryMetadata extends React.Component {
  render() {
    if (!this.props.singleSelected) {
      return (
        <div />
      );
    }

    if (this.props.loading) {
      return (
        <div>
          <h6>History</h6>
          <hr />
          <Loader visible />
        </div>
      );
    }

    if (this.props.history.length === 0) {
      return (
        <div>
          <h6>History</h6>
          <hr />
            No history to show
        </div>
      );
    }

    return (
      <div>
        <h6>History</h6>
        <hr />
        <ul>
          {this.props.history.map(h => (
            <li>{h.status}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  const fileList = store.focusedFiles.list;

  if (fileList === undefined || fileList.length !== 1) {
    return {
      singleSelected: false,
    };
  }

  const singleFocusedFile = store.focusedFiles.list[0];
  const historyAtPath = store.fileHistory[singleFocusedFile] || { history: [] };

  return {
    singleSelected: true,
    history: (historyAtPath === undefined ? [] : historyAtPath.history) || [],
    loading: (historyAtPath === undefined ? false : historyAtPath.loading),
  };
};

export default connect(mapStateToProps)(HistoryMetadata);
