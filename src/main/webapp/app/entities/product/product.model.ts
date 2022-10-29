import { IOrderDetails } from 'app/entities/order-details/order-details.model';
import { ICategory } from 'app/entities/category/category.model';

export interface IProduct {
  id?: number;
  name?: string;
  referenceProduct?: string;
  orderDetails?: IOrderDetails[] | null;
  category?: ICategory | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public referenceProduct?: string,
    public orderDetails?: IOrderDetails[] | null,
    public category?: ICategory | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
