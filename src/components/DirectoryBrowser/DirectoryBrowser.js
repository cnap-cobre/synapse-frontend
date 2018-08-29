import { connect } from 'react-redux';
import {fileIconResolver} from "../../util/FileIconResolver";
import Loader from "../Loader/Loader";
import PropTypes from 'prop-types';
import React from 'react';
import {toggleDotfiles} from "../../actions/visualOptions";

class DirectoryBrowser extends React.Component {
  static propTypes = {
    showDotfiles: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    list: PropTypes.array.isRequired,
    path: PropTypes.string.isRequired,
    toggleDotfiles: PropTypes.func.isRequired,
    handleDoubleClick: PropTypes.func.isRequired,
  };

  render = () => (
      <div style={this.props.style}>
        <table className="table table-hover"
               style={{display: this.props.error || this.props.loading ? 'none' : 'table'}}>
          <tbody>
          {this.props.list.map((item, i) => (
              <tr onDoubleClick={() => {this.props.handleDoubleClick('/' + item.system + item.path + '/')}}
                  key={i}
              >
                <td>
                  {fileIconResolver(item)}&nbsp;&nbsp;&nbsp;
                  {item.name}
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <div style={{
          display: (!(this.props.error || this.props.loading) && this.props.list.length === 0) ? 'block' : 'none',
          marginBottom: '2em'
        }}>
          This folder has no sub-folders.
        </div>
        <Loader visible={this.props.loading}/>
      </div>
  );
}

const mapStateToProps = (store, ownProps) => {
  const filesAtPath = store.files[ownProps.path];

  const loading = (filesAtPath === undefined || filesAtPath.isFetching);
  const error = (!loading) && (filesAtPath.errorCode || !filesAtPath.hasFetched);
  const list = (loading || error) ? [] : filesAtPath.files.filter((item) => item.type === 'dir');

  const showDotfiles = store.visualOptions.showDotfiles;

  return {
    loading,
    error,
    list: list.filter(
      (item, i) => ((showDotfiles || !item.name.match(/^\./i)) && item.type === "dir")
    ),
    showDotfiles
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleDotfiles: () => {
      dispatch(toggleDotfiles())
    },
    dispatch
  };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DirectoryBrowser);