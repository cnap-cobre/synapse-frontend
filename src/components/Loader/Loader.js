// @flow
import PropagateLoader from 'react-spinners/PropagateLoader';
import React from 'react';
import './Loader.css';

type Props = {
  visible: boolean
}

const Loader = (props: Props) => {
  const { visible } = props;
  return (
    <div
      className="loader"
      style={{ display: visible ? 'block' : 'none' }}
    >
      <PropagateLoader
        color="#512888"
        loading={visible}
      />
    </div>
  );
};

export default Loader;
