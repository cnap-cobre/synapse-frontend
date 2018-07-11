import { connect } from 'react-redux';
import DeleteFileModal from './DeleteFileModal';
import React from 'react';

class NewModalWrapper extends React.Component {
  render() {
    return (
        <div>
          {Object.keys(this.props.modals).map((id, i) => (
              <DeleteFileModal key={i}
                               id={id}
                               action={this.props.modals[id].action}
                               fileName={this.props.modals[id].fileName}
              />
          ))}
        </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    modals: store.modals
  };
};

export default connect(mapStateToProps)(NewModalWrapper);