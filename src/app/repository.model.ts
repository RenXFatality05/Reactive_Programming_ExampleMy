import { signal } from '@angular/core';
import { SimpleDataSource } from './datasource.model';
import { Product } from './product.model';

export class Model {
  private readonly products = signal([...new SimpleDataSource().getData()]);
  readonly Products = this.products.asReadonly();

  getProducts(): Product[] {
    return this.Products();
  }

  getProduct(id: number): Product | undefined {
    return this.Products().find(product => product.id === id);
  }

  saveProduct(product: Product): void {
    if (product.id === undefined || product.id === 0) {
      product.id = this.generateID();
    }

    this.products.update(products => {
      const index = products.findIndex(existing => existing.id === product.id);
      if (index === -1) {
        return [...products, product];
      }

      const updated = [...products];
      updated[index] = product;
      return updated;
    });
  }

  deleteProduct(id: number): void {
    this.products.update(products => {
      const index = products.findIndex(product => product.id === id);
      if (index === -1) {
        return products;
      }

      return products.filter((_, productIndex) => productIndex !== index);
    });
  }


  private generateID(): number {
    let candidate = 100;
    while (this.getProduct(candidate) !== undefined) {
      candidate++;
    }
    return candidate;
  }
}
