import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IOrderDetails, OrderDetails } from '../order-details.model';

import { OrderDetailsService } from './order-details.service';

describe('OrderDetails Service', () => {
  let service: OrderDetailsService;
  let httpMock: HttpTestingController;
  let elemDefault: IOrderDetails;
  let expectedResult: IOrderDetails | IOrderDetails[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(OrderDetailsService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      price: 'AAAAAAA',
      amount: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a OrderDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new OrderDetails()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a OrderDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          price: 'BBBBBB',
          amount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a OrderDetails', () => {
      const patchObject = Object.assign(
        {
          price: 'BBBBBB',
        },
        new OrderDetails()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of OrderDetails', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          price: 'BBBBBB',
          amount: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a OrderDetails', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addOrderDetailsToCollectionIfMissing', () => {
      it('should add a OrderDetails to an empty array', () => {
        const orderDetails: IOrderDetails = { id: 123 };
        expectedResult = service.addOrderDetailsToCollectionIfMissing([], orderDetails);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderDetails);
      });

      it('should not add a OrderDetails to an array that contains it', () => {
        const orderDetails: IOrderDetails = { id: 123 };
        const orderDetailsCollection: IOrderDetails[] = [
          {
            ...orderDetails,
          },
          { id: 456 },
        ];
        expectedResult = service.addOrderDetailsToCollectionIfMissing(orderDetailsCollection, orderDetails);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a OrderDetails to an array that doesn't contain it", () => {
        const orderDetails: IOrderDetails = { id: 123 };
        const orderDetailsCollection: IOrderDetails[] = [{ id: 456 }];
        expectedResult = service.addOrderDetailsToCollectionIfMissing(orderDetailsCollection, orderDetails);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderDetails);
      });

      it('should add only unique OrderDetails to an array', () => {
        const orderDetailsArray: IOrderDetails[] = [{ id: 123 }, { id: 456 }, { id: 95298 }];
        const orderDetailsCollection: IOrderDetails[] = [{ id: 123 }];
        expectedResult = service.addOrderDetailsToCollectionIfMissing(orderDetailsCollection, ...orderDetailsArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const orderDetails: IOrderDetails = { id: 123 };
        const orderDetails2: IOrderDetails = { id: 456 };
        expectedResult = service.addOrderDetailsToCollectionIfMissing([], orderDetails, orderDetails2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(orderDetails);
        expect(expectedResult).toContain(orderDetails2);
      });

      it('should accept null and undefined values', () => {
        const orderDetails: IOrderDetails = { id: 123 };
        expectedResult = service.addOrderDetailsToCollectionIfMissing([], null, orderDetails, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(orderDetails);
      });

      it('should return initial array if no OrderDetails is added', () => {
        const orderDetailsCollection: IOrderDetails[] = [{ id: 123 }];
        expectedResult = service.addOrderDetailsToCollectionIfMissing(orderDetailsCollection, undefined, null);
        expect(expectedResult).toEqual(orderDetailsCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
