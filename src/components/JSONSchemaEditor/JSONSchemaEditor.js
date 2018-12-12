// @flow

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import StringField from './StringField';
import BooleanField from './BooleanField';
import NumberField from './NumberField';

type Props = {
  schema: any,
  updateSchema(any): void,
}

export default class JSONSchemaEditor extends React.Component<> {
  render() {
    return (
        <div>Schema Editor</div>
    )
  }
}