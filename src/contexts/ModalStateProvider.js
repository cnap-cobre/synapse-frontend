import React from 'react';

export const ModalContext = React.createContext();

export class ModalStateProvider extends React.Component {

	state = {
		modalsDisplayed: [],
	};

	pushModalToDisplayContainer() {
			//create temporary shallow copy array, push new element on, and update state
			//to treat state variables as immutable
			const tempArray = this.state.ModalsDisplayed.slice();
			tempArray.push(modal);
			this.setState({ModalsDisplayed:tempArray});
	}

	render(){
			return (
				<ModalContext.Provider value={this}>
					{this.props.children}
				</ModalContext.Provider>
			)
	}

}