// @flow
import { connect } from 'react-redux';
import React from 'react';
import { fileIconResolver } from '../../util/FileIconResolver';
import Loader from '../Loader/Loader';
import { getShowDotfiles } from '../../store/ui/reducer';
import type { FileType } from '../../types/fileTypes';

type Props = {
  error: boolean,
  loading: boolean,
  list: Array<FileType>,
  path: string, // eslint-disable-line
  handleDoubleClick(string): typeof undefined,
  style?: any,
}

const DirectoryBrowser = (props: Props) => {
  const {
    style, error, loading, list, handleDoubleClick,
  } = props;

  return (
    <div style={style}>
      <table
        className="table table-hover"
        style={{ display: error || loading ? 'none' : 'table' }}
      >
        <tbody>
          {list.map(item => (
            <tr
              onDoubleClick={() => { handleDoubleClick(`${item.fullPath}/`); }}
              key={item.fullPath}
            >
              <td>
                {fileIconResolver(item)}
&nbsp;&nbsp;&nbsp;
                {item.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{
        display: (!(error || loading) && list.length === 0) ? 'block' : 'none',
        marginBottom: '2em',
      }}
      >
          This folder has no sub-folders.
      </div>
      <Loader visible={loading} />
    </div>
  );
};

DirectoryBrowser.defaultProps = {
  style: {},
};

const mapStateToProps = (store, ownProps) => {
  console.log('ownProps.path', ownProps.path);
  const filesAtPath = store.files[ownProps.path];

  const loading = (filesAtPath === undefined || filesAtPath.loading);
  const list = (loading) ? [] : filesAtPath.files.filter(item => item.type === 'dir');

  const showDotfiles = getShowDotfiles(store);

  return {
    loading,
    error: false, // TODO: fix hack
    list: list.filter(
      item => ((showDotfiles || !item.name.match(/^\./i)) && item.type === 'dir'),
    ),
    showDotfiles,
  };
};

export default connect(
  mapStateToProps,
)(DirectoryBrowser);
