// @flow

import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './schemaEditor.css';

const NumberField = (props) => {
  const {
    WrappingComponent, field, updateField, index, // deleteField
  } = props;
  return (
    <WrappingComponent className="schemaField">
        Number Field
      <FormGroup>
        <ControlLabel>
            Name
        </ControlLabel>
        <FormControl
          autocomplete="nope"
          value={field.name}
          onChange={(e) => {
            updateField({
              ...field,
              name: e.target.value,
            }, index);
          }}
        />
      </FormGroup>
    </WrappingComponent>
  );
};

export default NumberField;
