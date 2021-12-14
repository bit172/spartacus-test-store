import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StaticPageComponent } from '../static-page/static-page.component';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';
import { SaleComponent } from '../sale/sale.component';
import { ConfigModule, OccConfig, RoutingConfig } from '@spartacus/core';
import { ContactComponent } from '../contact/contact.component';

const STATIC_ROUTES: Routes = [
  {
    path: 'static-page',
    component: StaticPageComponent,
    canActivate: [CmsPageGuard],
    data: { pageLabel: 'cart' },
  },
  {
    path: 'alias/hilfe',
    component: PageLayoutComponent,
    data: { pageLabel: '/faq' },
    canActivate: [CmsPageGuard],
  },
  {
    path: 'sale',
    component: SaleComponent,
    data: { pageLabel: '/sale' },
    canActivate: [CmsPageGuard],
  },
  {
    path: 'contact',
    component: ContactComponent,
    data: { pageLabel: '/contact' },
    canActivate: [CmsPageGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(STATIC_ROUTES),
    ConfigModule.withConfig({
      routing: {
        routes: {
          product: {
            paths: [
              'oldschool/cameras/:firstCategory/:secondCategory/:manufacturer/:productCode/:name',
              'oldschool/cameras/:firstCategory/:secondCategory/:productCode/:name',
              'oldschool/cameras/:firstCategory/:productCode/:name',
              'oldschool/cameras/:productCode/:name',
              'oldschool/cameras/:productCode/',
            ],
            paramsMapping: { name: 'nameForUrl' },
          },
        },
      },
    } as RoutingConfig),
    ConfigModule.withConfig({
      backend: {
        occ: {
          endpoints: {
            product: {
              list: 'products/${productCode}?fields=code,name,manufacturer,summary,price(formattedValue),images(DEFAULT,galleryIndex),categories(FULL)',
            },
            // tslint:disable:max-line-length
            productSearch:
              'products/search?fields=products(code,name,manufacturer,summary,price(FULL),images(DEFAULT),stock(FULL),averageRating,variantOptions),facets,breadcrumbs,pagination(DEFAULT),sorts(DEFAULT),freeTextSearch,currentQuery',
          },
        },
      },
    } as OccConfig),
  ],
})
export class CustomRoutingModule {}
