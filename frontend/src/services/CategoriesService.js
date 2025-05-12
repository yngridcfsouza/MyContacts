import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from "./utils/HttpClient";

class CategoriesService {

  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories() {
    const categories = await this.httpClient.get('/categories');

    return categories.map((category) => CategoryMapper.toDomain(category));
  }

  async getCategoryById(id) {
    const category = await this.httpClient.get(`/categories/${id}`);

    return CategoryMapper.toDomain(category);
  }

  createCategory(category) {
    const body = CategoryMapper.toPersistence(category);

    return this.httpClient.post('/categories', { body });
  }

  updateCategory(id, category) {
    const body = CategoryMapper.toPersistence(category);

    return this.httpClient.put(`/categories/${id}`, { body });
  }

  deleteCategory(id) {
    return this.httpClient.delete(`/categories/${id}`);
  }

}
// eslint-disable-next-line
export default new CategoriesService();
