import dayjs from 'dayjs/esm';
import { IOrderDetails } from 'app/entities/order-details/order-details.model';
import { IClient } from 'app/entities/client/client.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  date?: dayjs.Dayjs;
  status?: OrderStatus;
  total?: string;
  orderDetails?: IOrderDetails[];
  client?: IClient;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs,
    public status?: OrderStatus,
    public total?: string,
    public orderDetails?: IOrderDetails[],
    public client?: IClient
  ) {}
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
