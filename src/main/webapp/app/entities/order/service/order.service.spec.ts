import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import dayjs from 'dayjs/esm';

import { DATE_FORMAT } from 'app/config/input.constants';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';
import { IOrder, Order } from '../order.model';

import { OrderService } from './order.service';

describe('Order Service', () => {
  let service: OrderService;
  let httpMock: HttpTestingController;
  let elemDefault: IOrder;
  let expectedResult: IOrder | IOrder[] | boolean | null;
  let currentDate: dayjs.Dayjs;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OrderService);
    httpMock = TestBed.inject(HttpTestingController);
    currentDate = dayjs();

    elemDefault = {
      id: 0,
      date: currentDate,
      status: OrderStatus.PLACED,
      total: 'AAAAAAA',
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign(
        {
          date: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Order', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
          date: currentDate.format(DATE_FORMAT),
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.create(new Order()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Order', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_FORMAT),
          status: 'BBBBBB',
          total: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Order', () => {
      const patchObject = Object.assign(
        {
          date: currentDate.format(DATE_FORMAT),
          total: 'BBBBBB',
        },
        new Order()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Order', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          date: currentDate.format(DATE_FORMAT),
          status: 'BBBBBB',
          total: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign(
        {
          date: currentDate,
        },
        returnedFromService
      );

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Order', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addOrderToCollectionIfMissing', () => {
      it('should add a Order to an empty array', () => {
        const order: IOrder = { id: 123 };
        expectedResult = service.addOrderToCollectionIfMissing([], order);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(order);
      });

      it('should not add a Order to an array that contains it', () => {
        const order: IOrder = { id: 123 };
        const orderCollection: IOrder[] = [
          {
            ...order,
          },
          { id: 456 },
        ];
        expectedResult = service.addOrderToCollectionIfMissing(orderCollection, order);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Order to an array that doesn't contain it", () => {
        const order: IOrder = { id: 123 };
        const orderCollection: IOrder[] = [{ id: 456 }];
        expectedResult = service.addOrderToCollectionIfMissing(orderCollection, order);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(order);
      });

      it('should add only unique Order to an array', () => {
        const orderArray: IOrder[] = [{ id: 123 }, { id: 456 }, { id: 19267 }];
        const orderCollection: IOrder[] = [{ id: 123 }];
        expectedResult = service.addOrderToCollectionIfMissing(orderCollection, ...orderArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const order: IOrder = { id: 123 };
        const order2: IOrder = { id: 456 };
        expectedResult = service.addOrderToCollectionIfMissing([], order, order2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(order);
        expect(expectedResult).toContain(order2);
      });

      it('should accept null and undefined values', () => {
        const order: IOrder = { id: 123 };
        expectedResult = service.addOrderToCollectionIfMissing([], null, order, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(order);
      });

      it('should return initial array if no Order is added', () => {
        const orderCollection: IOrder[] = [{ id: 123 }];
        expectedResult = service.addOrderToCollectionIfMissing(orderCollection, undefined, null);
        expect(expectedResult).toEqual(orderCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
