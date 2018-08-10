import DefaultLayout from '../DefaultLayout/DefaultLayout';
import React from 'react';

export default (props) => (
    <DefaultLayout>
      <div className="card">
        <div className="card-content">
          {props.children}
        </div>
      </div>
    </DefaultLayout>
);