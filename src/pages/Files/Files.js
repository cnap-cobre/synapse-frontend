import React from 'react';
import DefaultLayout from '../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../physical_layout/Card';

const Files = () => (
  <DefaultLayout>
    <div className="content">
      <div className="container-fluid">
        <Card header={(<h4>Nothing to see here.</h4>)} />
      </div>
    </div>
  </DefaultLayout>
);

export default Files;
