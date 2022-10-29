import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOrderDetails, OrderDetails } from '../order-details.model';
import { OrderDetailsService } from '../service/order-details.service';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

@Component({
  selector: 'marketneighbor-order-details-update',
  templateUrl: './order-details-update.component.html',
})
export class OrderDetailsUpdateComponent implements OnInit {
  isSaving = false;

  ordersSharedCollection: IOrder[] = [];
  productsSharedCollection: IProduct[] = [];

  editForm = this.fb.group({
    id: [],
    price: [null, [Validators.required, Validators.maxLength(50)]],
    amount: [null, [Validators.required]],
    order: [],
    product: [null, Validators.required],
  });

  constructor(
    protected orderDetailsService: OrderDetailsService,
    protected orderService: OrderService,
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderDetails }) => {
      this.updateForm(orderDetails);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const orderDetails = this.createFromForm();
    if (orderDetails.id !== undefined) {
      this.subscribeToSaveResponse(this.orderDetailsService.update(orderDetails));
    } else {
      this.subscribeToSaveResponse(this.orderDetailsService.create(orderDetails));
    }
  }

  trackOrderById(_index: number, item: IOrder): number {
    return item.id!;
  }

  trackProductById(_index: number, item: IProduct): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrderDetails>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(orderDetails: IOrderDetails): void {
    this.editForm.patchValue({
      id: orderDetails.id,
      price: orderDetails.price,
      amount: orderDetails.amount,
      order: orderDetails.order,
      product: orderDetails.product,
    });

    this.ordersSharedCollection = this.orderService.addOrderToCollectionIfMissing(this.ordersSharedCollection, orderDetails.order);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing(
      this.productsSharedCollection,
      orderDetails.product
    );
  }

  protected loadRelationshipsOptions(): void {
    this.orderService
      .query()
      .pipe(map((res: HttpResponse<IOrder[]>) => res.body ?? []))
      .pipe(map((orders: IOrder[]) => this.orderService.addOrderToCollectionIfMissing(orders, this.editForm.get('order')!.value)))
      .subscribe((orders: IOrder[]) => (this.ordersSharedCollection = orders));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) => this.productService.addProductToCollectionIfMissing(products, this.editForm.get('product')!.value))
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));
  }

  protected createFromForm(): IOrderDetails {
    return {
      ...new OrderDetails(),
      id: this.editForm.get(['id'])!.value,
      price: this.editForm.get(['price'])!.value,
      amount: this.editForm.get(['amount'])!.value,
      order: this.editForm.get(['order'])!.value,
      product: this.editForm.get(['product'])!.value,
    };
  }
}
