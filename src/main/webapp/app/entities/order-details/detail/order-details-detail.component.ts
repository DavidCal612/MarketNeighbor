import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOrderDetails } from '../order-details.model';

@Component({
  selector: 'marketneighbor-order-details-detail',
  templateUrl: './order-details-detail.component.html',
})
export class OrderDetailsDetailComponent implements OnInit {
  orderDetails: IOrderDetails | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ orderDetails }) => {
      this.orderDetails = orderDetails;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
