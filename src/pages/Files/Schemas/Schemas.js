// @flow

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import jsonSchemaGenerator from 'json-schema-generator';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { githubGist } from 'react-syntax-highlighter/dist/styles/hljs';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../../physical_layout/Card';
import JSONSchemaEditor from '../../../components/JSONSchemaEditor/JSONSchemaEditor';

type State = {
  schemas: Array<Array<any>>,
  currentSchema: Array<any>
}

// const CardBox = props => (
//   <Card {...props}>
//     {props.children}
//   </Card>
// );

const mapFieldToLibFormat = fields => fields.reduce((acc, field) => {
  const { name, ...rest } = field;
  const typeMap = { string: 'asdf', number: 5, boolean: true };
  acc[name] = typeMap[rest.type];
  return acc;
}, {});


export default class Schemas extends React.Component<null, State> {
  state = {
    schemas: [],
    currentSchema: [
      { type: 'string', name: 'Trial' },
      { type: 'number', name: 'Id' },
      { type: 'boolean', name: 'Calculated' },
    ],
  };

  updateSchema = (schema: any) => {
    this.setState({
      currentSchema: schema,
    });
  };

  render() {
    const { currentSchema, schemas } = this.state;
    console.log(schemas);

    return (
      <DefaultLayout>
        <div className="content">
          <Grid fluid>
            <Row>
              <Col xs={12}>
                <Card header={<h3 className="card-title">Metadata Schemas</h3>} hr>
                  <Row>
                    <Col xs={12} />
                  </Row>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col md={6}>

                <JSONSchemaEditor
                  schema={currentSchema}
                  updateSchema={this.updateSchema}
                  WrappingComponent={Card}
                />

              </Col>
              <Col md={6}>
                <Card header={<h4 className="card-title">Generated Schema</h4>} hr>
                  <SyntaxHighlighter language="javascript" style={githubGist}>
                    {JSON.stringify(jsonSchemaGenerator(
                      mapFieldToLibFormat(currentSchema),
                    ), null, 2)}
                  </SyntaxHighlighter>
                </Card>
              </Col>
            </Row>
          </Grid>
        </div>
      </DefaultLayout>
    );
  }
}
