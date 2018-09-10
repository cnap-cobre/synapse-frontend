import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import React from 'react';

export default class Files extends React.Component {
  render() {
    return (
        <DefaultLayout>
          <div className="content">
            <div className="container-fluid">
              <div className="card">
                <div className="card-content">
                  <h4>Nothing to see here.</h4>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
    );
  }
}