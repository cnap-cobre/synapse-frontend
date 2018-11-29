// @flow

import React from 'react';

export default function SearchBox() {
  return (
    <form className="navbar-form navbar-left navbar-search-form" role="search">
      <div className="input-group">
        <span className="input-group-addon"><i className="fa fa-search" /></span>
        <input type="text" value="" className="form-control" placeholder="Search..." />
      </div>
    </form>
  );
}
