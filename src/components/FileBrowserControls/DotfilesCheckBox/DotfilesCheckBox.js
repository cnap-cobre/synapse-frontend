import PropTypes from 'prop-types';
import React from 'react';

type Props = {
  id: string,
  showDotfiles: boolean,
  toggleDotfiles(): typeof undefined,
}

const DotfilesCheckBox = (props: Props) => {
  const { id, showDotfiles, toggleDotfiles } = props;

  return (
    <div
      className="checkbox"
      style={{
        marginLeft: '1.0em',
      }}
    >
      <input
        checked={showDotfiles}
        id={`DotfilesCheckbox${id}`}
        type="checkbox"
        onChange={toggleDotfiles}
      />

      <label htmlFor={`DotfilesCheckbox${id}`}>Show Dotfiles</label>
    </div>
  );
};

export default DotfilesCheckBox;
