const ContactsRepository = require('../repositories/ContactRepository');
const isValidUUID = require('../utils/isValidUUID');

class ContactController {
  // listar todos os registros
  async index(request, response) {
    const { orderBy } = request.query;
    const contacts = await ContactsRepository.findAll(orderBy);

    response.json(contacts);
  }

  // listar o contato pelo ID
  async show(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    const contact = await ContactsRepository.findById(id);

    if(!contact) {
      return response.status(404).json({error: 'Contact not found'});
    }

    response.json(contact);
  }
  // criar novo contato
  async store(request, response) {

    const { name, email, phone, category_id } = request.body;

    console.log(request.body);

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (email) {
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ error: 'This e-mail is already been used' });
      }
    }


    const contact = await ContactsRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.status(201).json(contact);
  }
  // deletar contato
  async delete(request, response) {
    const { id } = request.params;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid contact id' });
    }

    await ContactsRepository.delete(id);
     // 204 Sucess without content
    response.sendStatus(204);
  }
  // atualizar contato
  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id
    } = request.body;

    if (!isValidUUID(id)) {
      return response.status(400).json({ error: 'Invalid user id' });
    }

    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: 'Invalid category' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (email) {
      const contactEmailExists = await ContactsRepository.findByEmail(email);
      if (contactEmailExists && contactEmailExists.id !== id) {
        return response.status(400).json({ error: 'This e-mail is already been used' });
      }
    }

    const contact = await ContactsRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });

    response.json(contact);
  }
}
// Singleton
module.exports = new ContactController();
