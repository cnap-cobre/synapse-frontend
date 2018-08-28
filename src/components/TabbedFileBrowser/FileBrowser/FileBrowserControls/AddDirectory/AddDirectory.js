import Button from 'react-bootstrap/lib/Button';
import {connect} from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import PropTypes from 'prop-types';
import React from "react";

class AddDirectory extends React.Component{
  static propTypes = {

  };

  render = () => (
      <Button id="AddDirectoryButton"
              bsSize="xsmall"
              style={{
                height: "2.7em",
                marginTop: "0.5em",
                float: 'right'
              }}
      >
        <FaPlusSquare/>&nbsp;New Folder
      </Button>
  );
}

export default connect()(AddDirectory);