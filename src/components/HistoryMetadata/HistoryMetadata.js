// @flow

import { connect } from 'react-redux';
import React from 'react';
import Loader from '../Loader/Loader';

type Props = {
  singleSelected: boolean,
}

const HistoryMetadata = (props: Props) => {
  const { singleSelected, loading, history } = props;

  if (!singleSelected) {
    return (
      <div />
    );
  }

  if (loading) {
    return (
      <div>
        <h6>History</h6>
        <hr />
        <Loader visible />
      </div>
    );
  }

  if (history.length === 0) {
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
        {history.map(h => (
          <li>{h.status}</li>
        ))}
      </ul>
    </div>
  );
};

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
