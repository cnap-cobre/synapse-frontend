import React from 'react';
import DefaultLayout from '../DefaultLayout/DefaultLayout';

export default props => (
  <DefaultLayout>
    <div className="content">
      <div className="card">
        <div className="card-content">
          {props.children}
        </div>
      </div>
    </div>
  </DefaultLayout>
);
