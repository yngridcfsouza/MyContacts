import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";
import useErrors from "../../hooks/useErrors";
import CategoriesService from '../../services/CategoriesService';

import Input from "../Input";
import Select from "../Select";
import Button from "../Button";
import Spinner from "../Spinner";

export default function ContactForm({ buttonLabel, onSubmit }) {
  /* O estado é o que permite que o que é digitado seja renderizado ONE-WAY DATA BINDING*/
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* importando de forma nomeada as funções de dentro do custom hook */
  const { errors, setError, removeError, getErrorMessageByFieldName} = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
      const categoriesList = await CategoriesService.listCategories();

      setCategories(categoriesList);
    }  catch {} finally {
      setIsLoadingCategories(false);
    }
    }

    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);
    /* verficamos se existe o event.target.value, pois a atualização do state é atrasada */
    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório.' });
    } else {
      removeError('name');
    }
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (event.target.value && !isEmailValid(event.target.value)) {
      setError({field: 'email', message: 'E-mail inválido.'});
    } else {
      removeError('email');
    }
  }

  function handlePhoneChange(event) {
    setPhone(formatPhone(event.target.value));
  }

  async function handleSubmit(event) {
    event.preventDefault(); /* evitando o recarregamento da página e de perder os dados */

    setIsSubmitting(true);

    await onSubmit({
      /* phone: phone.replace(/\D/g, '') permite que quando formos pegar os dígitos sem os caracteres especiais */
      name, email, phone: phone.replace(/\D/g, ''), categoryId,
    });

    setIsSubmitting(false);
  }

  return (
    /* noValidate é um tipo boleean que garante que o browser não vai tentar validar os dados antes do submit */
    <Form onSubmit={handleSubmit} noValidate>

      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
        type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={handleEmailChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={handlePhoneChange}
          /* não permite digitar números maiores que 11 dígitos */
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value=''>Sem Categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          {!isSubmitting && buttonLabel}
          {isSubmitting && <Spinner size={8} />}
        </Button>
      </ButtonContainer>

    </Form>
  );
}

FormGroup.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}
