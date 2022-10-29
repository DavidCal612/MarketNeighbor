import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPayment, Payment } from '../payment.model';
import { PaymentService } from '../service/payment.service';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';
import { Iva } from 'app/entities/enumerations/iva.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

@Component({
  selector: 'marketneighbor-payment-update',
  templateUrl: './payment-update.component.html',
})
export class PaymentUpdateComponent implements OnInit {
  isSaving = false;
  ivaValues = Object.keys(Iva);
  paymentMethodValues = Object.keys(PaymentMethod);

  ordersCollection: IOrder[] = [];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    iva: [null, [Validators.required]],
    total: [null, [Validators.required, Validators.maxLength(100)]],
    payment: [null, [Validators.required]],
    order: [],
  });

  constructor(
    protected paymentService: PaymentService,
    protected orderService: OrderService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ payment }) => {
      this.updateForm(payment);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const payment = this.createFromForm();
    if (payment.id !== undefined) {
      this.subscribeToSaveResponse(this.paymentService.update(payment));
    } else {
      this.subscribeToSaveResponse(this.paymentService.create(payment));
    }
  }

  trackOrderById(_index: number, item: IOrder): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPayment>>): void {
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

  protected updateForm(payment: IPayment): void {
    this.editForm.patchValue({
      id: payment.id,
      date: payment.date,
      iva: payment.iva,
      total: payment.total,
      payment: payment.payment,
      order: payment.order,
    });

    this.ordersCollection = this.orderService.addOrderToCollectionIfMissing(this.ordersCollection, payment.order);
  }

  protected loadRelationshipsOptions(): void {
    this.orderService
      .query({ filter: 'payment-is-null' })
      .pipe(map((res: HttpResponse<IOrder[]>) => res.body ?? []))
      .pipe(map((orders: IOrder[]) => this.orderService.addOrderToCollectionIfMissing(orders, this.editForm.get('order')!.value)))
      .subscribe((orders: IOrder[]) => (this.ordersCollection = orders));
  }

  protected createFromForm(): IPayment {
    return {
      ...new Payment(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      iva: this.editForm.get(['iva'])!.value,
      total: this.editForm.get(['total'])!.value,
      payment: this.editForm.get(['payment'])!.value,
      order: this.editForm.get(['order'])!.value,
    };
  }
}
