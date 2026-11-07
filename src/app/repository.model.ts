import { SimpleDataSource } from './datasource.model';
import { Product } from './product.model';

export class Model {
  private readonly products = [...new SimpleDataSource().getData()];

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  saveProduct(product: Product): void {
    if (product.id === undefined || product.id === 0) {
      product.id = this.generateID();
    }

    const index = this.products.findIndex(existing => existing.id === product.id);
    if (index === -1) {
      this.products.push(product);
    } else {
      this.products[index] = product;
    }
  }

  deleteProduct(id: number): void {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  private generateID(): number {
    let candidate = 100;
    while (this.getProduct(candidate) !== undefined) {
      candidate++;
    }
    return candidate;
  }
}
