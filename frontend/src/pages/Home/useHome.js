import { useCallback, useEffect, useMemo, useState } from 'react';

import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export default function useHome() {
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

  return {
    isLoading,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    isLoadingDelete,
    contacts,
    hasError,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
    handleChangeSearchTerm,
    handleTryAgain,
    searchTerm,
  };
}
