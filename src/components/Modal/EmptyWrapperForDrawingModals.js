import React from 'react';

export default class EmptyWrapperForDrawingModals extends React.Component {
	componentDidMount() {
		console.log('Mounted');
	}

	render(){
    console.log('pizza', this.props.modalContext);
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