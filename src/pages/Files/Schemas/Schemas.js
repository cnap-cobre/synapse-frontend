// @flow

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import DefaultLayout from '../../../physical_layout/DefaultLayout/DefaultLayout';
import Card from '../../../physical_layout/Card';
import JSONSchemaEditor from '../../../components/JSONSchemaEditor/JSONSchemaEditor';

type State = {
  schemas: Array<any>,
  currentSchema: any
}

export default class Schemas extends React.Component<null, State> {
  state = {
    schemas: [],
    currentSchema: {},
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
              <Col>
                <Card header={<h3>Metadata Schemas</h3>}>
                  <Row>
                    <Col xs={12} />
                  </Row>
                  <Row>
                    <Col md={6}>
                      <JSONSchemaEditor schema={currentSchema} updateSchema={this.updateSchema} />
                    </Col>
                    <Col md={6}>
                      <textarea>
                        {/* <SyntaxHighlighter language="javascript"> */}
                        {/* {JSON.stringify(currentSchema)} */}
                        {/* </SyntaxHighlighter> */}
                      </textarea>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </Grid>
        </div>
      </DefaultLayout>
    );
  }
}
