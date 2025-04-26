const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();

    response.json(categories);
  }

  async store(request, response) {
    const { name } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is required' });
    }

    const categoryExists = await CategoriesRepository.findByName({ name });
    if (categoryExists) {
      return response.status(400).json({ error: 'This category name is already been used' });
    }

    const category = await CategoriesRepository.create({ name });
    response.status(201).json(category);
  }

  async show(request, response) {
    const { id } = request.params;

    const category = await CategoriesRepository.findByCategoryId(id);

    if(!category) {
      return response.status(404).json({error: 'Category not found'});
    }

    response.json(category);
  }

  // deletar categoria
  async delete(request, response) {
      const { id } = request.params;

      await CategoriesRepository.delete(id);
       // 204 Sucess without content
      response.sendStatus(204);
    }

  // atualizar categoria
  async update(request, response) {
      const { id } = request.params;
      const {
        name
      } = request.body;

      const categoryExists = await CategoriesRepository.findByCategoryId(id);
      if (!categoryExists) {
        return response.status(404).json({ error: 'Category not found' });
      }

      if (!name) {
        return response.status(400).json({ error: 'Category name is required' });
      }

      const category = await CategoriesRepository.update(id, { name });

      response.json(category);
    }

}
// singleton
module.exports = new CategoryController();
