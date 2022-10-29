import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PaymentService } from '../service/payment.service';
import { IPayment, Payment } from '../payment.model';
import { IOrder } from 'app/entities/order/order.model';
import { OrderService } from 'app/entities/order/service/order.service';

import { PaymentUpdateComponent } from './payment-update.component';

describe('Payment Management Update Component', () => {
  let comp: PaymentUpdateComponent;
  let fixture: ComponentFixture<PaymentUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let paymentService: PaymentService;
  let orderService: OrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PaymentUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PaymentUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PaymentUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    paymentService = TestBed.inject(PaymentService);
    orderService = TestBed.inject(OrderService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call order query and add missing value', () => {
      const payment: IPayment = { id: 456 };
      const order: IOrder = { id: 74682 };
      payment.order = order;

      const orderCollection: IOrder[] = [{ id: 37678 }];
      jest.spyOn(orderService, 'query').mockReturnValue(of(new HttpResponse({ body: orderCollection })));
      const expectedCollection: IOrder[] = [order, ...orderCollection];
      jest.spyOn(orderService, 'addOrderToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(orderService.query).toHaveBeenCalled();
      expect(orderService.addOrderToCollectionIfMissing).toHaveBeenCalledWith(orderCollection, order);
      expect(comp.ordersCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const payment: IPayment = { id: 456 };
      const order: IOrder = { id: 87973 };
      payment.order = order;

      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(payment));
      expect(comp.ordersCollection).toContain(order);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Payment>>();
      const payment = { id: 123 };
      jest.spyOn(paymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payment }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(paymentService.update).toHaveBeenCalledWith(payment);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Payment>>();
      const payment = new Payment();
      jest.spyOn(paymentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: payment }));
      saveSubject.complete();

      // THEN
      expect(paymentService.create).toHaveBeenCalledWith(payment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Payment>>();
      const payment = { id: 123 };
      jest.spyOn(paymentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ payment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(paymentService.update).toHaveBeenCalledWith(payment);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackOrderById', () => {
      it('Should return tracked Order primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackOrderById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
