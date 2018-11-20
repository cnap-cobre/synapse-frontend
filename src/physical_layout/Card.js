import React from 'react'

export default (props) => (
    <div className="card">
      {props.header ? (
          <div className="card-header">
            {props.header}
            {props.hr ? (<hr/>) : (null)}
          </div>
      ) : (null)}
      <div className="card-content">
        {props.children}
      </div>
    </div>
)