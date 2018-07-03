import React from 'react';

export const ModalContext = React.createContext();

export class ModalStateProvider extends React.Component {

	state = {
		modalsDisplayed: [],
	};

	PushModalToDisplayContainer(modal) {
			//create temporary shallow copy array, push new element on, and update state
			//to treat state variables as immutable
      console.log('the fucking modal', modal);
		  console.log('before', this.state.modalsDisplayed);


			const tempArray = this.state.modalsDisplayed.slice();

			tempArray.push(modal);

			this.setState({
        modalsDisplayed: tempArray
      }, () => {
			  console.log('after', this.state.modalsDisplayed)
      });
	}

	render(){
			return (
				<ModalContext.Provider value={this}>
					{this.props.children}
				</ModalContext.Provider>
			)
	}

}