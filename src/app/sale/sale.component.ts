import { Component, OnInit } from '@angular/core';
import {
  CmsService,
  ProductSearchService,
  RoutingService,
} from '@spartacus/core';
import { filter, pluck, take } from 'rxjs/operators';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss'],
})
export class SaleComponent implements OnInit {
  constructor(
    private cmsService: CmsService,
    private routingService: RoutingService,
    private productSearchService: ProductSearchService
  ) {}

  ngOnInit(): void {
    this.cmsService.getCurrentPage().subscribe(console.log);
  }

  goToRandomProduct() {
    this.productSearchService.search('cam');
    this.productSearchService
      .getResults()
      .pipe(
        filter((res) => res.hasOwnProperty('products')),
        pluck('products'),
        take(1)
      )
      .subscribe((products: any[]) => {
        const randomProduct =
          products[Math.floor(Math.random() * products.length)];
        this.routingService.go({
          cxRoute: 'product',
          params: {
            code: randomProduct.code,
            nameForUrl: randomProduct.nameForUrl,
          },
        });
      });
  }
}
