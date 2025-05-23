import PropTypes from 'prop-types';

import { Container } from "./styles";

import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';
import { useEffect } from 'react';

export default function ToastMessage({ message, onRemoveMessage, isLeaving, animatedRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id);
    }, message.duration || 7000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return(
    <Container
      type={message.type}
      onClick={handleRemoveToast}
      tabIndex={0}
      role='button'
      isLeaving={isLeaving}
      ref={animatedRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt='X' />}
      {message.type === 'success' && <img src={checkCircle} alt='Check' />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};
/* oneOf permite colocar uma array de strings limitadas */
