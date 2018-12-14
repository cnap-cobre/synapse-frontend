import React from 'react';
import DefaultLayout from '../DefaultLayout/DefaultLayout';

export default (props) => {
  const { children } = props;
  return (
    <DefaultLayout>
      <div className="content">
        <div className="card">
          <div className="card-content">
            {children}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
