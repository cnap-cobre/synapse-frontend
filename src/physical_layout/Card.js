import React from 'react';

export default (props) => {
  const { header, hr, children } = props;
  return (
    <div className="card">
      {header ? (
        <div className="card-header">
          {header}
          {hr ? (<hr style={{ marginBottom: '5px' }} />) : (null)}
        </div>
      ) : (null)}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};
