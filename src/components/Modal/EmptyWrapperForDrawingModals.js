import React from 'react';

export default class EmptyWrapperForDrawingModals extends React.Component {
  render(){
    return(
      <div>
        {this.props.modalContext.modalsDisplayed.map((modal, i) => (
          React.cloneElement(
            modal,
            {...modal.props, key: i}
          )
        ))}
      </div>
    );
  }
}