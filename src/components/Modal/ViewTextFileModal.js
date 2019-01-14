// @flow
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/lib/Modal';

import { removeModal } from '../../store/ui/modals/Modals';
import agaveFileActions from '../../services/Agave/agaveFileActions';
import Loader from '../Loader/Loader';
import dropboxFileActions from '../../services/Dropbox/dropboxFileActions';
import type { ViewTextFileModalType } from '../../types/modalTypes';

type Props = ViewTextFileModalType & {
  $removeModal(string): typeof undefined,
  csrftoken: string,
}

type State = {
  show: boolean,
  contents: string,
}

class ViewTextFileModal extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      contents: '',
    };

    if (props.file.provider === 'agave') {
      agaveFileActions.wget(null, props.file)
        .then(contents => this.setState({ contents }));
    }

    if (props.file.provider === 'dropbox') {
      dropboxFileActions.wget(props.csrftoken, props.file)
        .then((contents) => {
          new Response(contents).text().then((x) => {
            this.setState({ contents: x });
          });
        });
    }
  }


  closeModal = () => {
    const { id, $removeModal } = this.props;

    this.setState({
      show: false,
    });
    setTimeout(() => {
      $removeModal(id);
    }, 500);
  };

  render() {
    const { file } = this.props;
    const { show, contents } = this.state;

    return (
      <Modal
        show={show}
        backdrop
        onHide={this.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {file.name}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          { contents === '' ? (
            <Loader visible />
          ) : (
            <pre style={{
              overflow: 'auto', maxHeight: '80vh', wordWrap: 'normal', whiteSpace: 'pre',
            }}
            >
              { contents }
            </pre>
          )}
        </Modal.Body>

        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
  csrftoken: store.csrf.token,
});

const mapDispatchToProps = {
  $removeModal: removeModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewTextFileModal);
