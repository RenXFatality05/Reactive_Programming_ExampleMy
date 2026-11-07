import { Component, computed, effect, inject, NgZone, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Model } from './repository.model';
import { Ticker } from './ticker.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  private readonly model = new Model();
  private readonly messages = ['Total', 'Price'];
  private readonly index = signal(0);

  private readonly ticker = new Ticker();
  protected readonly tickerValue = inject(NgZone).runOutsideAngular(
    () => toSignal(this.ticker.value, { initialValue: 0 }),
  );

  protected readonly count = computed(() => this.model.Products().length);
  private readonly total = computed(() => this.model.Products()
    .reduce((total, product) => total + (product.price ?? 0), 0)
    .toFixed(2));
  protected readonly message = computed(
    () => `${this.messages[this.index()]} $${this.total()} Ticker: ${this.tickerValue()}`,
  );

  constructor() {
    effect(() => console.log(`count value computed: ${this.count()}`));
    effect(() => console.log(`message value computed: ${this.message()}`));
  }

  protected toggleMessage(): void {
    console.clear();
    console.log('toggleMessage method invoked');
    this.index.update(index => (index + 1) % this.messages.length);
  }

  protected removeProduct(): void {
    console.clear();
    console.log('removeProduct method invoked');
    const id = this.model.Products()[0]?.id;
    if (id !== undefined) {
      this.model.deleteProduct(id);
    }
  }
}
