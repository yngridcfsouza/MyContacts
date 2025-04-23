import { useState } from "react";

export default function useErrors() {
  const [errors, setErrors] = useState([]);

  function setError({ field, message }) {

    /* se o erro já existe dentro do array 'errors', filtra e para a função */
    const errorAlreadyExists = errors.find((error) => error.field === field);
    if (errorAlreadyExists) {
      return;
    };

    /* se não existe, continua e adiciona ao que já existe usando os parâmetros */
    setErrors((prevState) => [
      ...prevState,
      {field, message},
    ]);
  }

  function removeError(field) {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  }

  function getErrorMessageByFieldName(fieldName) {
    return errors.find((error) => error.field === fieldName)?.message;
  }

  return { errors, setError, removeError, getErrorMessageByFieldName };
}
