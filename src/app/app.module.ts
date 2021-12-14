import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';
import { StaticPageComponent } from './static-page/static-page.component';
import { CustomRoutingModule } from './custom-routing/custom-routing.module';
import { SaleComponent } from './sale/sale.component';
import { PRODUCT_NORMALIZER, UrlModule } from '@spartacus/core';
import { ProductNameNormalizer } from './product-name.normalizer';
import { ProductCategoryNormalizer } from './product-category.normalizer';
import { RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    StaticPageComponent,
    SaleComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl: 'https://40.76.109.9:9002',
          prefix: '/occ/v2/',
        },
      },
      context: {
        currency: ['USD'],
        language: ['en'],
        baseSite: ['electronics-spa'],
        urlParameters: ['baseSite', 'language', 'currency'],
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
      features: {
        level: '2.1',
      },
    }),
    CustomRoutingModule,
    BrowserTransferStateModule,
    RouterModule,
    UrlModule,
  ],
  providers: [
    {
      provide: PRODUCT_NORMALIZER,
      useClass: ProductNameNormalizer,
      multi: true,
    },
    {
      provide: PRODUCT_NORMALIZER,
      useClass: ProductCategoryNormalizer,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
