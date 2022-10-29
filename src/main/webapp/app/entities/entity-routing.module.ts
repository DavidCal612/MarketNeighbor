import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'document-type',
        data: { pageTitle: 'marketNeighborApp.documentType.home.title' },
        loadChildren: () => import('./document-type/document-type.module').then(m => m.DocumentTypeModule),
      },
      {
        path: 'client',
        data: { pageTitle: 'marketNeighborApp.client.home.title' },
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      },
      {
        path: 'order',
        data: { pageTitle: 'marketNeighborApp.order.home.title' },
        loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
      },
      {
        path: 'order-details',
        data: { pageTitle: 'marketNeighborApp.orderDetails.home.title' },
        loadChildren: () => import('./order-details/order-details.module').then(m => m.OrderDetailsModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'marketNeighborApp.product.home.title' },
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'category',
        data: { pageTitle: 'marketNeighborApp.category.home.title' },
        loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),
      },
      {
        path: 'payment',
        data: { pageTitle: 'marketNeighborApp.payment.home.title' },
        loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
