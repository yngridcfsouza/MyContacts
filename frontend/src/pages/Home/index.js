import { Container } from "./styles";

import useHome from './useHome';

import InputSearch from './components/InputSearch';
import Header from "./components/Header";
import EmptyList from './components/EmptyList';
import Loader from '../../components/Loader';
import ErrorStatus from './components/ErrorStatus';
import SearchNotFound from './components/SearchNotFound';
import ContactsList from './components/ContactsList';
import Modal from '../../components/Modal';

export default function Home() {
  const {
    isLoading,
    isLoadingDelete,
    isDeleteModalVisible,
    contactBeingDeleted,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    contacts,
    searchTerm,
    handleChangeSearchTerm,
    hasError,
    handleTryAgain,
    filteredContacts,
    orderBy,
    handleToggleOrderBy,
    handleDeleteContact,
  } = useHome();

  const hasContacts = !hasError && contacts.length > 0;
  const isListEmpty = !hasError && (!hasContacts && !isLoading);
  const isNotFound = !hasError && (filteredContacts.length < 1 && hasContacts);

  return (
    <Container>

      <Loader isLoading={isLoading}/>

      {hasContacts && (
        <InputSearch
          onChange={handleChangeSearchTerm}
          value={searchTerm}
        />
      )}

      <Header
        hasError={hasError}
        quantityOfContacts={contacts.length}
        quantityOfFilteredContacts={filteredContacts.length}
      />

      {hasError && (<ErrorStatus onTryAgain={handleTryAgain} />)}
      {(isNotFound) && (<SearchNotFound searchTerm={searchTerm}/>)}
      {(isListEmpty) && (<EmptyList />)}

      {hasContacts && (
        <>
          <ContactsList
            orderBy={orderBy}
            onToggleOrderBy={handleToggleOrderBy}
            onDeleteContact={handleDeleteContact}
            filteredContacts={filteredContacts}
          />

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
        </>
      )}

    </Container>
  );
}
