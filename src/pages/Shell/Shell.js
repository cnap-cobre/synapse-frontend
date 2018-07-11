import DefaultLayout from "../../physical_layout/DefaultLayout/DefaultLayout";
import React from 'react';

export default class Shell extends React.Component {
  render() {
    return (
        <DefaultLayout>
        <div className="content">
          <div className="container-fluid">
            <h1>Shell coming soon.</h1>
          </div>
        </div>
        </DefaultLayout>
    );
  }
}
