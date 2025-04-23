import delay from "../utils/delay";

class ContactsService {
  async loadContacts(orderBy = 'asc') {

    const response = await fetch(
      `http://localhost:3001/contacts?orderBy=${orderBy}`,
    )

    await delay(500);

    return response.json();
    /* body parse que permite pegar a resposta da request e transformar em um array com objetos json  */
  }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ContactsService();
