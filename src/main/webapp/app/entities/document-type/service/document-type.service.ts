import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDocumentType, getDocumentTypeIdentifier } from '../document-type.model';

export type EntityResponseType = HttpResponse<IDocumentType>;
export type EntityArrayResponseType = HttpResponse<IDocumentType[]>;

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/document-types');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(documentType: IDocumentType): Observable<EntityResponseType> {
    return this.http.post<IDocumentType>(this.resourceUrl, documentType, { observe: 'response' });
  }

  update(documentType: IDocumentType): Observable<EntityResponseType> {
    return this.http.put<IDocumentType>(`${this.resourceUrl}/${getDocumentTypeIdentifier(documentType) as number}`, documentType, {
      observe: 'response',
    });
  }

  partialUpdate(documentType: IDocumentType): Observable<EntityResponseType> {
    return this.http.patch<IDocumentType>(`${this.resourceUrl}/${getDocumentTypeIdentifier(documentType) as number}`, documentType, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDocumentType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDocumentTypeToCollectionIfMissing(
    documentTypeCollection: IDocumentType[],
    ...documentTypesToCheck: (IDocumentType | null | undefined)[]
  ): IDocumentType[] {
    const documentTypes: IDocumentType[] = documentTypesToCheck.filter(isPresent);
    if (documentTypes.length > 0) {
      const documentTypeCollectionIdentifiers = documentTypeCollection.map(
        documentTypeItem => getDocumentTypeIdentifier(documentTypeItem)!
      );
      const documentTypesToAdd = documentTypes.filter(documentTypeItem => {
        const documentTypeIdentifier = getDocumentTypeIdentifier(documentTypeItem);
        if (documentTypeIdentifier == null || documentTypeCollectionIdentifiers.includes(documentTypeIdentifier)) {
          return false;
        }
        documentTypeCollectionIdentifiers.push(documentTypeIdentifier);
        return true;
      });
      return [...documentTypesToAdd, ...documentTypeCollection];
    }
    return documentTypeCollection;
  }
}
