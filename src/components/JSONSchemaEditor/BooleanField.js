// @flow

import React from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './schemaEditor.css';

type Props = any

const BooleanField = (props: Props) => {
  const {
    WrappingComponent, field, updateField, index, // deleteField,
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
