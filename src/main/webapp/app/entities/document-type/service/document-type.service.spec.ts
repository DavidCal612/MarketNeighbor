import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StateDocument } from 'app/entities/enumerations/state-document.model';
import { IDocumentType, DocumentType } from '../document-type.model';

import { DocumentTypeService } from './document-type.service';

describe('DocumentType Service', () => {
  let service: DocumentTypeService;
  let httpMock: HttpTestingController;
  let elemDefault: IDocumentType;
  let expectedResult: IDocumentType | IDocumentType[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DocumentTypeService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      initials: 'AAAAAAA',
      documentName: 'AAAAAAA',
      status: StateDocument.ACTIVE,
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

    it('should create a DocumentType', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new DocumentType()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a DocumentType', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          initials: 'BBBBBB',
          documentName: 'BBBBBB',
          status: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a DocumentType', () => {
      const patchObject = Object.assign(
        {
          initials: 'BBBBBB',
          documentName: 'BBBBBB',
          status: 'BBBBBB',
        },
        new DocumentType()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of DocumentType', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          initials: 'BBBBBB',
          documentName: 'BBBBBB',
          status: 'BBBBBB',
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

    it('should delete a DocumentType', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDocumentTypeToCollectionIfMissing', () => {
      it('should add a DocumentType to an empty array', () => {
        const documentType: IDocumentType = { id: 123 };
        expectedResult = service.addDocumentTypeToCollectionIfMissing([], documentType);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentType);
      });

      it('should not add a DocumentType to an array that contains it', () => {
        const documentType: IDocumentType = { id: 123 };
        const documentTypeCollection: IDocumentType[] = [
          {
            ...documentType,
          },
          { id: 456 },
        ];
        expectedResult = service.addDocumentTypeToCollectionIfMissing(documentTypeCollection, documentType);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a DocumentType to an array that doesn't contain it", () => {
        const documentType: IDocumentType = { id: 123 };
        const documentTypeCollection: IDocumentType[] = [{ id: 456 }];
        expectedResult = service.addDocumentTypeToCollectionIfMissing(documentTypeCollection, documentType);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentType);
      });

      it('should add only unique DocumentType to an array', () => {
        const documentTypeArray: IDocumentType[] = [{ id: 123 }, { id: 456 }, { id: 24441 }];
        const documentTypeCollection: IDocumentType[] = [{ id: 123 }];
        expectedResult = service.addDocumentTypeToCollectionIfMissing(documentTypeCollection, ...documentTypeArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const documentType: IDocumentType = { id: 123 };
        const documentType2: IDocumentType = { id: 456 };
        expectedResult = service.addDocumentTypeToCollectionIfMissing([], documentType, documentType2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(documentType);
        expect(expectedResult).toContain(documentType2);
      });

      it('should accept null and undefined values', () => {
        const documentType: IDocumentType = { id: 123 };
        expectedResult = service.addDocumentTypeToCollectionIfMissing([], null, documentType, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(documentType);
      });

      it('should return initial array if no DocumentType is added', () => {
        const documentTypeCollection: IDocumentType[] = [{ id: 123 }];
        expectedResult = service.addDocumentTypeToCollectionIfMissing(documentTypeCollection, undefined, null);
        expect(expectedResult).toEqual(documentTypeCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
