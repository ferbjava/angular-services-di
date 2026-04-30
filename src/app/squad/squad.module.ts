import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SquadRoutingModule } from './squad-routing.module';
import { SquadCatalogComponent } from './squad-catalog/squad-catalog.component';
import { CART_OPTIONS_TOKEN, CartOptions, CartService } from '@core/cart.service';
import { IProductsServiceToken } from '@shared/products-service.interface';
import { EngineersService } from './engineers.service';
@NgModule({
  declarations: [SquadCatalogComponent],
  imports: [SharedModule, SquadRoutingModule],
  providers: [
    CartService,
    {
      provide: IProductsServiceToken,
      useClass: EngineersService,
    },
    {
      provide: CART_OPTIONS_TOKEN,
      useValue: {
        persistenceType: 'local',
        persistenceKey: 'squad-cart',
      } as CartOptions,
    },
  ],
})
export class SquadModule {}
