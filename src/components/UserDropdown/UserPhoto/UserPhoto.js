import React from 'react';
import {UserProfileContext} from "../../../contexts/UserProfileContext";

export default function() {
  return (
      <UserProfileContext.Consumer>
        {state => {
          console.log('pizza', state);
          return (<img src={state.profile.gravatar.url} />);
        }}
      </UserProfileContext.Consumer>
  );
}