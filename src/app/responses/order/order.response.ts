import { OrderDetail } from 'src/app/models/order-detail';

export interface OrderResponse {
  id: number;
  user_id: number;
  fullname: string;
  email: string;
  phone_number: string;
  address: string;
  note: string;
  order_date: Date;
  payment_method: string;
  shipping_date: Date;
  shipping_method: string;
  status: string;
  total_money: number;
  order_details: OrderDetail[]
}
