import sad from '../../../../assets/images/sad.svg';
import Button from '../../../../components/Button';

import { Container } from './styles';

export default function ErrorStatus({ onTryAgain }) {
  return(
    <Container>
      <img src={sad} alt='Sad'></img>
      <div className='details'>
        <strong>Ocorreu um erro ao obter seus contatos!</strong>
        <Button type='button' onClick={onTryAgain}>Tentar novamente</Button>
      </div>
    </Container>
  );
}
