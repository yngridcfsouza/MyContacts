import PropTypes from "prop-types";
import { useState } from "react";

import useErrors from "../../hooks/useErrors";

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from '../../utils/formatPhone';

import FormGroup from "../FormGroup";
import { Form, ButtonContainer } from "./styles";

import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

export default function ContactForm({ buttonLabel }) {
  /* O estado é o que permite que o que é digitado seja renderizado ONE-WAY DATA BINDING*/
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('');

  /* importando de forma nomeada as funções de dentro do custom hook */
  const { errors, setError, removeError, getErrorMessageByFieldName} = useErrors();

  const isFormValid = (name && errors.length === 0);

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

  function handleSubmit(event) {
    event.preventDefault(); /* evitando o recarregamento da página e de perder os dados */
    console.log({
      /* phone: phone.replace(/\D/g, '') permite que quando formos pegar os dígitos sem os caracteres especiais */
      name, email, phone: phone.replace(/\D/g, ''), category,
    });
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
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
        type="email"
          error={getErrorMessageByFieldName('email')}
          placeholder="E-mail"
          value={email} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={handleEmailChange}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={handlePhoneChange}
          /* não permite digitar números maiores que 11 dígitos */
          maxLength="15"
        />
      </FormGroup>

      <FormGroup>
        <Select
          value={category} /* isso permite o gerenciamento (controle) do component pelo React  */
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value=''>Categoria</option>
          <option value='instagram'>Instagram</option>
          <option value='discord'>Discord</option>
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid}>
          {buttonLabel}
        </Button>
      </ButtonContainer>

    </Form>
  );
}

FormGroup.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}
