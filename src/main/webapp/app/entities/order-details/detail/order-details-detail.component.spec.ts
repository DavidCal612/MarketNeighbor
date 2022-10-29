import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OrderDetailsDetailComponent } from './order-details-detail.component';

describe('OrderDetails Management Detail Component', () => {
  let comp: OrderDetailsDetailComponent;
  let fixture: ComponentFixture<OrderDetailsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderDetailsDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ orderDetails: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(OrderDetailsDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(OrderDetailsDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load orderDetails on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.orderDetails).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
