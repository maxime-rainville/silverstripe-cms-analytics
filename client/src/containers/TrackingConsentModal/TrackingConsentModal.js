import i18n from 'i18n';
import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PropTypes from 'prop-types';

class TrackingConsentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return (
      <Modal isOpen={this.state.modal}>
        <ModalHeader>
          {i18n._t('TrackingConsentModal.ModalTitle', 'Help us improve Silverstripe')}
        </ModalHeader>
        <ModalBody>
          <div dangerouslySetInnerHTML={this.props.content} />
        </ModalBody>
        <ModalFooter>
          <Button key={'ok'} onClick={() => {
            this.props.onGrant();
            this.toggle();
          }}>
            {i18n._t('TrackingConsentModal.OK', 'OK')}
          </Button>
        </ModalFooter>
      </Modal>
    )
  }
};

TrackingConsentModal.propTypes = {
  onGrant: PropTypes.func,
  onDeny: PropTypes.func,
  content: PropTypes.string,
}

export default TrackingConsentModal;
