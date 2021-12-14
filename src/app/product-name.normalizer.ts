import { Injectable } from '@angular/core';
import { Converter, Occ, Product } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
})
export class ProductNameNormalizer implements Converter<Occ.Product, Product> {
  constructor() {}

  convert(source: Occ.Product, target?: any): any {
    if (source.name) {
      target.nameForUrl = source.name.toLowerCase();
      target.nameForUrl = target.nameForUrl.replace(/ /g, '-');
      target.nameForUrl = target.nameForUrl.slice(0, 10);
    }
    return target;
  }
}
