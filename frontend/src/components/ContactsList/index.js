import { Container, Header, ListContainer, Card } from "./styles";

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

export default function ContactsList() {
  return (
    <Container>
      <Header>
        <strong>3 contatos</strong>
        <a href="/">Novo Contato</a>
      </Header>

      <ListContainer>
        <header>
          <button type="button">
            <span>Nome</span>
            <img src={arrow} alt="Arrow"/>
          </button>
        </header>
      </ListContainer>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Mateus Silva</strong>
            <small>instagram</small>
          </div>
          <span>mail@mail.com</span>
          <span>(99) 99999-9999</span>
        </div>
        <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit"></img>
            </a>
            <button type="button">
            <img src={trash} alt="Delete"></img>
            </button>
          </div>
      </Card>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>André Silva</strong>
            <small>instagram</small>
          </div>
          <span>mail@mail.com</span>
          <span>(99) 99999-9999</span>
        </div>
        <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit"></img>
            </a>
            <button type="button">
            <img src={trash} alt="Delete"></img>
            </button>
          </div>
      </Card>

      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Giovana Silva</strong>
            <small>instagram</small>
          </div>
          <span>mail@mail.com</span>
          <span>(99) 99999-9999</span>
        </div>
        <div className="actions">
            <a href="/">
              <img src={edit} alt="Edit"></img>
            </a>
            <button type="button">
            <img src={trash} alt="Delete"></img>
            </button>
          </div>
      </Card>
    </Container>
  );
}

