import PropTypes from 'prop-types';

import { Overlay } from "./styles";
import Spinner from '../Spinner';
import ReactPortal from '../ReactPortal';
import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';

export default function Loader({ isLoading }) {
  const { shouldRender, animatedElementRef } = useAnimatedUnmount(isLoading);

  if (!isLoading) {
    return null;
  }

  let container = document.getElementById('loader-root');

  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', 'loader-root');
    document.body.appendChild(container);
  }

  return (
    <ReactPortal containerId='loader-portal'>
      <Overlay isLeaving={shouldRender} ref={animatedElementRef}>
        <Spinner size={24}/>
      </Overlay>
    </ReactPortal>
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
