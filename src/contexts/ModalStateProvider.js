import React from 'react';

export const ModalContext = React.createContext();

export class ModalStateProvider extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      modalsDisplayed: [],
      PushModalToDisplayContainer: this.PushModalToDisplayContainer
    }
  }


  PushModalToDisplayContainer = (function(modal){
    //create temporary shallow copy array, push new element on, and update state
    //to treat state variables as immutable
    console.log('the modal', modal);
    console.log('before', this.state);

    this.setState((prevState, props) => {
      const tempArray = prevState.modalsDisplayed.slice();
      tempArray.push(modal);
      return {
        modalsDisplayed: tempArray
      };
    }, () => {
      console.log('after', this.state);
    });
  }).bind(this);

	render(){
			return (
				<ModalContext.Provider value={this.state}>
					{this.props.children}
				</ModalContext.Provider>
			)
	}

}