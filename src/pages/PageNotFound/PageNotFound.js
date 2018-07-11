import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import React from 'react';

export default function(){
  return (
      <DefaultLayout>
        <div className="content">
          <div className="container-fluid">
        <h1>404 Not Found</h1>
        <p>While it's possible you mistyped the URL, we may have broken something.</p>
        <p>Submit a bug report here:  <a href={"https://github.com/cnap-cobre/synapse"}>
          https://github.com/cnap-cobre/synapse</a></p>
          </div>
        </div>
      </DefaultLayout>
  );
}