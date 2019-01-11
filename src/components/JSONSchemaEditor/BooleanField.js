// @flow

import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './schemaEditor.css';

const BooleanField = (props) => {
  const {
    WrappingComponent, field, updateField, deleteField, index,
  } = props;


  return (
    <WrappingComponent className="schemaField">
        Boolean Field
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

export default BooleanField;
