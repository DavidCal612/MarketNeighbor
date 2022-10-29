import { IClient } from 'app/entities/client/client.model';
import { StateDocument } from 'app/entities/enumerations/state-document.model';

export interface IDocumentType {
  id?: number;
  initials?: string;
  documentName?: string;
  status?: StateDocument;
  clients?: IClient[] | null;
}

export class DocumentType implements IDocumentType {
  constructor(
    public id?: number,
    public initials?: string,
    public documentName?: string,
    public status?: StateDocument,
    public clients?: IClient[] | null
  ) {}
}

export function getDocumentTypeIdentifier(documentType: IDocumentType): number | undefined {
  return documentType.id;
}
