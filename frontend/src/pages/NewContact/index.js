import PageHeader from "../../components/PageHeader";

import ContactForm from "../../components/ContactForm";
import ContactsService from "../../services/ContactsService";
import toast from "../../utils/toast";

import { useRef } from "react";

export default function NewContact() {

  const contactFormRef = useRef(null);

  async function handleSubmit(contact) {
    try {

      await ContactsService.createContact(contact);

      contactFormRef.current.resetFields();

      toast({
        type: 'success',
        text: 'Contato cadastrado com sucesso!',
        duration: 3000,
      });

    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um problema ao cadastrar o contato!',
      });
    }
  }
  return (
    <>
      <PageHeader
        title='Novo contato'
      />

      <ContactForm
        ref={contactFormRef}
        buttonLabel='Cadastrar'
        onSubmit={handleSubmit}
      />

    </>
  );
}
