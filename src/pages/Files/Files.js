import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import TabbedFileBrowser from "Components/TabbedFileBrowser/TabbedFileBrowser";
import CardLayout from '../../physical_layout/CardLayout/CardLayout';
import { UserProfileContext } from '../../contexts/UserProfileContext';

export default class Files extends Component {
  render() {
    return (
        <CardLayout>
        <Route render={({history}) => (
            <UserProfileContext.Consumer>
              {(userProfileContext) => (
                  <TabbedFileBrowser history={history}
                                     agaveSystems={userProfileContext.agaveSystems.filter((sys) => (
                                         !sys.public
                                     ))}
                  />
              )}
            </UserProfileContext.Consumer>
        )} />
        </CardLayout>
    );
  }
}
