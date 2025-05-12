import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmpyListContainer,
  SearchNotFoundContainer
} from "./styles";

import arrow from '../../assets/images/icons/arrow.svg';
import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';
import sad from '../../assets/images/sad.svg';
import emptyBox from '../../assets/images/empty-box.svg';
import magnifierQuestion from '../../assets/images/magnifier-question.svg';

import Modal from '../../components/Modal';
import Loader from '../../components/Loader';
import Button from '../../components/Button';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

/* import APIError from '../../errors/APIError'; */

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible ] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  const loadContacts = useCallback(async () => {
    try {
      setIsLoading(true);

      const contactsList = await ContactsService.listContacts(orderBy);

      setHasError(false);
      setContacts(contactsList);
    } catch (error) {
        setHasError(true);
    } finally {
        setIsLoading(false);
    }
  }, [orderBy]);

  /* se ao invés de pesquisar o termo pelo pedaço do nome, também tem a opção
    de pesquisar pelo que for exatamente digitado, ao invés de usar o .includes()
    usa o .startsWith() */
  /* observar a forma como trabalhar com o async/await dentro do useEffect */

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  function handleToggleOrderBy() {
    setOrderBy(
      (prevState) => (prevState === 'asc' ? 'desc' : 'asc'),
    );
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleTryAgain() {
    loadContacts();
  }

  function handleDeleteContact(contact) {
    setContactBeingDeleted(contact);
    setIsDeleteModalVisible(true);
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
  }

  async function handleConfirmDeleteContact() {
    try {
      setIsLoadingDelete(true);

      await ContactsService.deleteContact(contactBeingDeleted.id);

      setContacts(prevState => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));

      handleCloseDeleteModal();

      toast({
        type: 'success',
        text: 'Contato deletado com sucesso!'
      });

    } catch {
      toast({
        type: 'danger',
        text: 'Erro ao deletar o contato!'
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }


  return (
    <Container>

      <Loader isLoading={isLoading}/>

      <Modal
        danger
        visible={isDeleteModalVisible}
        title={`Você tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
        cancelLabel='Cancelar'
        confirmLabel='Deletar'
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        isLoading={isLoadingDelete}
      >
        <p>Esta ação não poderá ser desfeita</p>
      </Modal>

      {contacts.length > 0 && (
        <InputSearchContainer>
          <input
            value={searchTerm}
            type="text"
            placeholder="Pesquisar pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header $justifyContent={
        hasError
          ? 'flex-end'
          : (
            contacts.length > 0
            ? 'space-between'
            : 'center'
          )
        }
      >
        {(!hasError && contacts.length > 0) && (
          <strong>
            {filteredContacts.length}
            {filteredContacts.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new">Novo Contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src={sad} alt='Sad'></img>
          <div className='details'>
            <strong>Ocorreu um erro ao obter seus contatos!</strong>
            <Button type='button' onClick={handleTryAgain}>Tentar novamente</Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {(filteredContacts.length < 1 && contacts.length > 0) && (
              <SearchNotFoundContainer>
                <img src={magnifierQuestion} alt='Magnifier question'/>
                <span>Nenhum resultado encontrado para <strong>{searchTerm}</strong>.</span>
              </SearchNotFoundContainer>
            )
          }

          {(contacts.length < 1 && !isLoading) && (
            <EmpyListContainer>
              <img src={emptyBox} alt='Empty-Box'/>
              <p>
                Você ainda não tem contatos cadastrados! Clique no botão <strong>"Novo contato"</strong> acima para cadastrar o seu primeiro!
              </p>
            </EmpyListContainer>
          )}

          <ListHeader $orderBy={orderBy}>
            {filteredContacts.length > 0 && (
              <button type="button" onClick={handleToggleOrderBy}>
                <span>Nome</span>
                <img src={arrow} alt="Arrow"/>
              </button>
            )}
          </ListHeader>

          {filteredContacts.map((contact) =>(
            <Card key={contact.id}>
              <div className="info">
                <div className="contact-name">
                  <strong>{contact.name}</strong>
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src={edit} alt="Edit"></img>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                <img src={trash} alt="Delete"></img>
                </button>
              </div>
            </Card>
          ))}
        </>
      )}

    </Container>
  );
}
