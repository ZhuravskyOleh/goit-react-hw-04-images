import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, ModalStyle } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onClose);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onClose);
  }

  onClose = e => {
    if (e?.code === 'Escape' || e?.target === e?.currentTarget)
      this.props.closeWindow();
  };

  render() {
    const { children } = this.props;
    return createPortal(
      <Overlay onClick={this.onClose}>
        <ModalStyle>{children}</ModalStyle>
      </Overlay>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeWindow: PropTypes.func.isRequired,
};
export default Modal;
