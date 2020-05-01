import { interval, Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { random, randomPrice } from '../random-generator';
import { RowId } from '@material-ui-x/grid';

export interface PricingModel {
  id: RowId;
  currencyPair: string;
  priceSpot?: number;
  price1m: number;
  price2m: number;
  price3m: number;
  price6m: number;
  price1y: number;
  price2y: number;
  price5y: number;
}

export const pricingColumns = [
  { field: 'id' },
  { field: 'currencyPair' },
  { field: 'priceSpot', type: 'number' },
  { field: 'price1m', type: 'number' },
  { field: 'price2m', type: 'number' },
  { field: 'price3m', type: 'number' },
  { field: 'price6m', type: 'number' },
  { field: 'price1y', type: 'number' },
  { field: 'price2y', type: 'number' },
  { field: 'price5y', type: 'number' },
];

export function subscribeCurrencyPair(
  currencyPair: string,
  i: number,
  minUpdateRate = 100,
  maxUpdateRate = 500,
): Observable<PricingModel> {
  return interval(random(minUpdateRate, maxUpdateRate)).pipe(
    flatMap(() => {
      return new Observable<any>(obs => {
        const model: PricingModel = {
          id: i,
          currencyPair,
          priceSpot: randomPrice(),
          price1m: randomPrice(),
          price2m: randomPrice(),
          price3m: randomPrice(),
          price6m: randomPrice(),
          price1y: randomPrice(),
          price2y: randomPrice(),
          price5y: randomPrice(),
        };
        obs.next(model);
      });
    }),
  );
}
