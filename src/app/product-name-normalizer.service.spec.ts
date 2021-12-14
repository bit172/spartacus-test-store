import { TestBed } from '@angular/core/testing';

import { ProductNameNormalizerService } from './product-name-normalizer.service';

describe('ProductNameNormalizerService', () => {
  let service: ProductNameNormalizerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductNameNormalizerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
