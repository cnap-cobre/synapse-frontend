import DefaultLayout from '../DefaultLayout/DefaultLayout';
import React from 'react';

export default (props) => (
    <DefaultLayout>
      <div className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-content">
              {props.children}
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
);