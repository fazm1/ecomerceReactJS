import data from './data.json';

class DataService {
  constructor() {
    this.data = data.data;
  }

  getProducts() {
    return this.data.products;
  }

  getCategories() {
    return this.data.categories;
  }

  getProductById(id) {
    return this.data.products.find(product => product.id === id);
  }

  getProductsByCategory(category) {
    if (category === 'all') {
      return this.data.products;
    }
    return this.data.products.filter(product => product.category === category);
  }
}

export default new DataService();

