import React from 'react';

export default class EmptyWrapperForDrawingModals extends React.Component {
	componentDidMount() {
		console.log('Mounted');
	}

	render(){
    console.log('pizza', this.props.modalContext);
		return(
        <div>
					<b>{this.props.modalContext.state.modalsDisplayed.map(
							(modal) => <span>{modal.props.fileToBeDeleted.name}</span>
					)}</b>


          {this.props.modalContext.state.modalsDisplayed.map((modal) => (
              React.cloneElement(
                  modal.type,
                  [...modal.props]
              )
          ))}
        </div>
		);
	}
}