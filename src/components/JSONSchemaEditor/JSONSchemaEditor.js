// @flow

import * as React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

import StringField from './StringField';
import NumberField from './NumberField';
import BooleanField from './BooleanField';

type Props = {
  schema: any,
  updateSchema(any): void,
  wrappingComponent: React.Node,
}

class JSONSchemaEditor extends React.Component<Props> {
  addField = (type: string) => {
    const { schema, updateSchema } = this.props;
    updateSchema([
      ...schema,
      { type, name: '' },
    ]);
  };

  addStringField = () => this.addField('string');

  addNumberField = () => this.addField('number');

  addBooleanField = () => this.addField('boolean');

  updateField = (field, index) => {
    const { schema, updateSchema } = this.props;
    updateSchema([
      ...schema.slice(0, index),
      field,
      ...schema.slice(index + 1, schema.length),
    ]);
  };

  deleteField = (index) => {
    const { schema, updateSchema } = this.props;
    updateSchema([
      ...schema.slice(0, index),
      ...schema.slice(index + 1, schema.length),
    ]);
  };

  render() {
    const { schema, updateSchema, WrappingComponent } = this.props;
    const fields = schema.map((field, index) => {
      if (field.type === 'string') {
        return (
          <StringField
            index={index}
            field={field}
            updateField={this.updateField}
            WrappingComponent={WrappingComponent}
            deleteField={this.deleteField}
          />
        );
      }
      if (field.type === 'number') {
        return (
          <NumberField
            index={index}
            field={field}
            updateField={this.updateField}
            WrappingComponent={WrappingComponent}
            deleteField={this.deleteField}
          />
        );
      }
      if (field.type === 'boolean') {
        return (
          <BooleanField
            index={index}
            field={field}
            updateField={this.updateField}
            WrappingComponent={WrappingComponent}
            deleteField={this.deleteField}
          />
        );
      }
    });

    return (
      <div className="schemaEditor">
        <WrappingComponent header={<h3 className="card-title">Schema Editor</h3>} hr>
          <strong>Add a field:</strong>
          <br />
          <br />
          <ButtonGroup>
            <Button onClick={this.addStringField}>String</Button>
            <Button onClick={this.addNumberField}>Number</Button>
            <Button onClick={this.addBooleanField}>Boolean</Button>
          </ButtonGroup>
          <br />
          <br />
          <Button bsStyle="success" className="btn-fill">Submit</Button>
        </WrappingComponent>

        <form autoComplete="off">
          {fields}
        </form>
      </div>
    );
  }
}

export default JSONSchemaEditor;
