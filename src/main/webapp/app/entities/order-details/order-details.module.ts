import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OrderDetailsComponent } from './list/order-details.component';
import { OrderDetailsDetailComponent } from './detail/order-details-detail.component';
import { OrderDetailsUpdateComponent } from './update/order-details-update.component';
import { OrderDetailsDeleteDialogComponent } from './delete/order-details-delete-dialog.component';
import { OrderDetailsRoutingModule } from './route/order-details-routing.module';

@NgModule({
  imports: [SharedModule, OrderDetailsRoutingModule],
  declarations: [OrderDetailsComponent, OrderDetailsDetailComponent, OrderDetailsUpdateComponent, OrderDetailsDeleteDialogComponent],
  entryComponents: [OrderDetailsDeleteDialogComponent],
})
export class OrderDetailsModule {}
