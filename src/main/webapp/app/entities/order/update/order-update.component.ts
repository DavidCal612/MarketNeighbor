import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOrder, Order } from '../order.model';
import { OrderService } from '../service/order.service';
import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

@Component({
  selector: 'marketneighbor-order-update',
  templateUrl: './order-update.component.html',
})
export class OrderUpdateComponent implements OnInit {
  isSaving = false;
  orderStatusValues = Object.keys(OrderStatus);

  clientsSharedCollection: IClient[] = [];

  editForm = this.fb.group({
    id: [],
    date: [null, [Validators.required]],
    status: [null, [Validators.required]],
    total: [null, [Validators.required, Validators.maxLength(100)]],
    client: [null, Validators.required],
  });

  constructor(
    protected orderService: OrderService,
    protected clientService: ClientService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ order }) => {
      this.updateForm(order);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const order = this.createFromForm();
    if (order.id !== undefined) {
      this.subscribeToSaveResponse(this.orderService.update(order));
    } else {
      this.subscribeToSaveResponse(this.orderService.create(order));
    }
  }

  trackClientById(_index: number, item: IClient): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOrder>>): void {
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

  protected updateForm(order: IOrder): void {
    this.editForm.patchValue({
      id: order.id,
      date: order.date,
      status: order.status,
      total: order.total,
      client: order.client,
    });

    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing(this.clientsSharedCollection, order.client);
  }

  protected loadRelationshipsOptions(): void {
    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing(clients, this.editForm.get('client')!.value)))
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));
  }

  protected createFromForm(): IOrder {
    return {
      ...new Order(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      status: this.editForm.get(['status'])!.value,
      total: this.editForm.get(['total'])!.value,
      client: this.editForm.get(['client'])!.value,
    };
  }
}
