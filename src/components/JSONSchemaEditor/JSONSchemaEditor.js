// @flow

import React from 'react';
// import { Grid, Row, Col } from 'react-bootstrap';
//
// import StringField from './StringField';
// import BooleanField from './BooleanField';
// import NumberField from './NumberField';

type Props = {
  schema: any,
  updateSchema(any): void,
}

const JSONSchemaEditor = (props: Props) => {
  const { schema, updateSchema } = props;
  console.log(schema, updateSchema);
  return (
    <div>Schema Editor</div>
  );
};

export default JSONSchemaEditor;
