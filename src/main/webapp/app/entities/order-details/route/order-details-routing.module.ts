import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrderDetailsComponent } from '../list/order-details.component';
import { OrderDetailsDetailComponent } from '../detail/order-details-detail.component';
import { OrderDetailsUpdateComponent } from '../update/order-details-update.component';
import { OrderDetailsRoutingResolveService } from './order-details-routing-resolve.service';

const orderDetailsRoute: Routes = [
  {
    path: '',
    component: OrderDetailsComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrderDetailsDetailComponent,
    resolve: {
      orderDetails: OrderDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrderDetailsUpdateComponent,
    resolve: {
      orderDetails: OrderDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrderDetailsUpdateComponent,
    resolve: {
      orderDetails: OrderDetailsRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(orderDetailsRoute)],
  exports: [RouterModule],
})
export class OrderDetailsRoutingModule {}
