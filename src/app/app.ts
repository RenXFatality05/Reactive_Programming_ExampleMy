import { Component } from '@angular/core';
import { Model } from './repository.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly model = new Model();

  protected get count(): number {
    return this.model.getProducts().length;
  }
}
