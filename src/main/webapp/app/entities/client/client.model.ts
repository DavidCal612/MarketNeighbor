import { IUser } from 'app/entities/user/user.model';
import { IOrder } from 'app/entities/order/order.model';
import { IDocumentType } from 'app/entities/document-type/document-type.model';
import { Sex } from 'app/entities/enumerations/sex.model';

export interface IClient {
  id?: number;
  address?: string;
  phoneNumber?: string;
  firstName?: string;
  secondName?: string | null;
  lastName?: string;
  secondLastName?: string | null;
  sexType?: Sex;
  email?: string;
  documentNumber?: string;
  user?: IUser;
  orders?: IOrder[] | null;
  documentType?: IDocumentType;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public address?: string,
    public phoneNumber?: string,
    public firstName?: string,
    public secondName?: string | null,
    public lastName?: string,
    public secondLastName?: string | null,
    public sexType?: Sex,
    public email?: string,
    public documentNumber?: string,
    public user?: IUser,
    public orders?: IOrder[] | null,
    public documentType?: IDocumentType
  ) {}
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
