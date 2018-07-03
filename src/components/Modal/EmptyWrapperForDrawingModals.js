import React from 'react';
import { ModalContext } from '../../contexts/ModalStateProvider'

export default class EmptyWrapperForDrawingModals extends React.Component {

	render(){
		return(
			<ModalContext.Consumer>
				{(context) => (
					<div>
						{context.state.modalsDisplayed.map((modal) => (
							React.createElement(
								DeleteFileModal,
								[props = modal.props]
								)
						))}
					</div>
				)}
			</ModalContext.Consumer>
		)
	}
}