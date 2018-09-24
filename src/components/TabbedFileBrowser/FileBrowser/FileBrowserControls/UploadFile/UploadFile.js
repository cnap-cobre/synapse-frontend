import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import FaArrowUp from 'react-icons/lib/fa/arrow-up';
import PropTypes from 'prop-types';
import React from "react";

class UploadFile extends React.Component{
  static propTypes = {

  };

  render = () => (
      <Button id="UploadFileButton"
              bsSize="xsmall"
              style={{
                height: "2.7em",
                marginTop: "0.5em",
                float: 'right',
                marginRight: '0.5em'
              }}
      >
        <FaArrowUp/>&nbsp;Upload
      </Button>
  );
}

export default connect()(UploadFile);