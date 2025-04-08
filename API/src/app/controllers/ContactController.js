const ContactsRepository = require('../repositories/ContactRepository');

class ContactController {
  // listar todos os registros
  async index(request, response) {
      const contacts = await ContactsRepository.findAll();

      response.json(contacts);
  }

  // listar o contato pelo ID
  async show(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if(!contact) {
      return response.status(404).json({error: 'User not found'});
    }

    response.json(contact);
  }
  // criar novo contato
  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactExists = await ContactsRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This e-mail is already been used' });
    }

    const contact = await ContactsRepository.create({
      name, email, phone, category_id,
    });

    response.json(contact);
  }
  // deletar contato
  async delete(request, response) {
    const { id } = request.params;

    const contact = await ContactsRepository.findById(id);

    if(!contact) {
      return response.status(404).json({error: 'User not found'});
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

    const contactExists = await ContactsRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'User not found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const contactEmailExists = await ContactsRepository.findByEmail(email);
    if (contactEmailExists && contactEmailExists.id !== id) {
      return response.status(400).json({ error: 'This e-mail is already been used' });
    }

    const contact = await ContactsRepository.update(id, { name, email, phone, category_id});

    response.json(contact);
  }
}
// Singleton
module.exports = new ContactController();
