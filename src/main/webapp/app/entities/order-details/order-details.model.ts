import { IOrder } from 'app/entities/order/order.model';
import { IProduct } from 'app/entities/product/product.model';

export interface IOrderDetails {
  id?: number;
  price?: string;
  amount?: number;
  order?: IOrder | null;
  product?: IProduct;
}

export class OrderDetails implements IOrderDetails {
  constructor(public id?: number, public price?: string, public amount?: number, public order?: IOrder | null, public product?: IProduct) {}
}

export function getOrderDetailsIdentifier(orderDetails: IOrderDetails): number | undefined {
  return orderDetails.id;
}
