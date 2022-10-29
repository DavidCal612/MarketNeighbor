import dayjs from 'dayjs/esm';
import { IOrder } from 'app/entities/order/order.model';
import { Iva } from 'app/entities/enumerations/iva.model';
import { PaymentMethod } from 'app/entities/enumerations/payment-method.model';

export interface IPayment {
  id?: number;
  date?: dayjs.Dayjs;
  iva?: Iva;
  total?: string;
  payment?: PaymentMethod;
  order?: IOrder | null;
}

export class Payment implements IPayment {
  constructor(
    public id?: number,
    public date?: dayjs.Dayjs,
    public iva?: Iva,
    public total?: string,
    public payment?: PaymentMethod,
    public order?: IOrder | null
  ) {}
}

export function getPaymentIdentifier(payment: IPayment): number | undefined {
  return payment.id;
}
