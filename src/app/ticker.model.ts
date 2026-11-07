import { interval, Observable } from 'rxjs';

export class Ticker {
  readonly value: Observable<number> = interval(500);
}
