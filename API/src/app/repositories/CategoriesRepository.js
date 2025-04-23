const db = require('../../database');


class CategoriesRepository {
  // listar todos os registros
  async findAll() {
    const rows = await db.query('SELECT * FROM categories ORDER BY name');
    return rows;
  }

  // // criar novo categoria
  async create({ name }) {
    const [row] = await db.query(`
      INSERT INTO categories(name)
      VALUES($1)
      RETURNING *
    `, [name]);

    return row;
  }

  async findByName({ name }) {
    const [row] = await db.query('SELECT * FROM categories WHERE LOWER(name) = LOWER($1)', [name]);
    return row;
  }

  // listar a categoria pelo ID
  async findByCategoryId(id) {
    const [row] = await db.query(`
      SELECT *
      FROM categories
      WHERE categories.id = $1
      `, [id]);
    return row;
  }

  // deletar categoria
  async delete(id) {
      const deleteOp = await db.query('DELETE FROM categories WHERE id = $1', [id]);
      return(deleteOp);
    }

  // atualizar categoria
  async update(id, { name }) {
    const [row] = await db.query(`
      UPDATE categories
      SET name = $1
      WHERE id = $2
      RETURNING *
      `, [name, id]);
    return row;
  }

}
// singleton
module.exports = new CategoriesRepository();
