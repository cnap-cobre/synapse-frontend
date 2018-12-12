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

const data = { hello: { world: true }};

export default class Schemas extends React.Component<null, State> {
  state = {
    currentSchema: {}
  };

  render() {
    const { currentSchema } = this.state;

    return (
        <DefaultLayout>
          <div className="content">
            <Grid fluid>
              <Row>
                <Col>
                  <Card header={<h3>Metadata Schemas</h3>}>
                    <Row>
                      <Col xs={12}>

                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <JSONSchemaEditor/>
                      </Col>
                      <Col md={6}>
                        <textarea>
                          {/*<SyntaxHighlighter language="javascript">*/}
                            {/*{JSON.stringify(currentSchema)}*/}
                          {/*</SyntaxHighlighter>*/}
                        </textarea>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </Grid>
          </div>
        </DefaultLayout>
    )
  }
}
