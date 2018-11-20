import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import React from 'react';
import Card from '../../physical_layout/Card'

export default class Files extends React.Component {
  render() {
    return (
        <DefaultLayout>
          <div className="content">
            <div className="container-fluid">
              <Card header={(<h4>Nothing to see here.</h4>)} />
            </div>
          </div>
        </DefaultLayout>
    );
  }
}